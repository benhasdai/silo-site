#!/usr/bin/env python3
"""Read-only HTTP/TLS probe for the SILO site. Fetches; never mutates.

GitHub-Pages-aware: /go/* are static 200 meta-refresh shims (NOT 302s), so we
extract the baked destination and resolve it too. Stdlib only — no venv, no key.

Checks: routes/shims/TLS (original) + HSTS + tabnabbing (target=_blank without
rel=noopener) + same-origin resources on marketing pages + vendor-iframe
allowlist on club/giftcard + no-secrets scan of a local dist/ (if present) +
static smoke markup (dietary filter/mobile-nav/tab-panel presence).

KNOWN GAP — read before trusting a green run: the "smoke" check below verifies
markup PRESENCE only (button exists, has the right data attribute). It does
NOT execute JavaScript, so it cannot catch a broken click handler, a filter
that silently does nothing, or a tab that never switches. That needs a real
browser (Lighthouse / chrome-devtools / manual) — see pre-launch-audit.md.

Usage:
    python3 check-site.py [--target https://benhasdai.github.io] [--dist ../dist]
"""
import argparse
import glob
import json
import os
import re
import socket
import ssl
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone

LOCALES = ["en", "ru"]                       # he is the unprefixed default
PAGES = ["", "menu", "events", "club", "giftcard", "accessibility", "404"]
GO_SHIMS = ["reserve", "club", "delivery", "giftcard"]   # no /go/waze — direct link
EXPECTED_404_SUFFIXES = ("/404", "/en/404", "/ru/404")   # a 404 status here is CORRECT

MARKETING_PAGES = ["", "menu", "events"]                 # must be 100% same-origin
IFRAME_PAGES = ["club", "giftcard"]                       # sanctioned-iframe pages
ALLOWED_IFRAME_HOST = "valuecard.co.il"                   # owner ruling 2026-07-14
                                                           # (Pelecard is a further hop
                                                           # inside ValueCard's own page,
                                                           # never a direct iframe src here)

_META = re.compile(r'http-equiv=["\']refresh["\'][^>]*url=([^"\'>]+)', re.I)
_JS = re.compile(r'location\.replace\((["\'])(.*?)\1\)', re.I)
_CANON = re.compile(r'rel=["\']canonical["\'][^>]*href=["\']([^"\']+)', re.I)
_UA = {"User-Agent": "silo-staff-check/1.0 (+read-only site check)"}

_A_BLANK_TAG = re.compile(r'<a\b[^>]*\btarget=["\']_blank["\'][^>]*>', re.I)
_REL_NOOPENER = re.compile(r'\brel=["\'][^"\']*\bnoopener\b', re.I)
_IFRAME_SRC = re.compile(r'<iframe\b[^>]*\bsrc=["\']([^"\']+)["\']', re.I)
_LD_JSON = re.compile(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>', re.I | re.S)
_RESOURCE_SRC = re.compile(r'<(?:script|img|source|video|audio)\b[^>]*\bsrc=["\'](https?://[^"\']+)', re.I)
_LINK_TAG = re.compile(r'<link\b([^>]*)>', re.I)
_LINK_HREF = re.compile(r'\bhref=["\'](https?://[^"\']+)["\']', re.I)
_LINK_REL = re.compile(r'\brel=["\']([^"\']+)["\']', re.I)

# Deliberately specific (prefix/shape-based), not keyword-based — a bare
# "token"/"secret" match is too noisy (e.g. CSS "design token" comments).
_SECRET_PATTERNS = [
    re.compile(r'\bAIza[0-9A-Za-z_\-]{35}\b'),                       # Google API key
    re.compile(r'\bsk_live_[0-9A-Za-z]{16,}\b'),                     # Stripe live secret
    re.compile(r'\bghp_[0-9A-Za-z]{36}\b'),                          # GitHub PAT
    re.compile(r'\bxox[baprs]-[0-9A-Za-z-]{10,}\b'),                 # Slack token
    re.compile(r'(?:api|secret|access)[_-]?key\s*[:=]\s*["\'][A-Za-z0-9_\-]{16,}["\']', re.I),
    re.compile(r'-----BEGIN (?:RSA |EC )?PRIVATE KEY-----'),
]


def routes_for(target_url: str) -> list[str]:
    base = target_url.rstrip("/")
    urls = [base + (f"/{page}" if page else "/") for page in PAGES]
    for loc in LOCALES:
        urls += [base + (f"/{loc}/{page}" if page else f"/{loc}/") for page in PAGES]
    return urls                                          # 7 + 7 + 7 = 21


def go_urls(target_url: str) -> list[str]:
    base = target_url.rstrip("/")
    return [f"{base}/go/{s}" for s in GO_SHIMS]


def audit_url(url: str, timeout: int = 15) -> dict:
    t0 = time.time()
    req = urllib.request.Request(url, headers=_UA)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read(4000).decode("utf-8", errors="replace")
            final_url = r.geturl()
            headers = r.headers
            status = r.status
    except urllib.error.HTTPError as e:
        body = e.read(4000).decode("utf-8", errors="replace") if e.fp else ""
        final_url, headers, status = e.url, e.headers, e.code
    except Exception as e:  # noqa: BLE001
        return {"url": url, "status": None, "error": str(e),
                "elapsed_ms": int((time.time() - t0) * 1000)}

    dest = ""
    mjs = _JS.search(body)
    if mjs:
        dest = mjs.group(2)
    else:
        m = _META.search(body) or _CANON.search(body)
        dest = m.group(1) if m else ""

    return {
        "url": url, "status": status, "final_url": final_url,
        "redirected": final_url != url,
        "content_type": headers.get("content-type", ""),
        "cache_control": headers.get("cache-control", ""),
        "strict_transport_security": headers.get("strict-transport-security", ""),
        "elapsed_ms": int((time.time() - t0) * 1000),
        "redirect_dest": dest, "error": "",
    }


def fetch_full(url: str, timeout: int = 15, cap: int = 800_000) -> str:
    """Full-body fetch for text-scanning checks (routes_for's audit_url caps at
    4000 bytes for speed — not enough to see every tag on a long page)."""
    req = urllib.request.Request(url, headers=_UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read(cap).decode("utf-8", errors="replace")


def cert_info(host: str) -> dict:
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((host, 443), timeout=10) as sock:
            with ctx.wrap_socket(sock, server_hostname=host) as ssock:
                cert = ssock.getpeercert()
        exp = datetime.strptime(cert["notAfter"], "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
        return {"cert_expiry": exp.isoformat(), "cert_days_left": (exp - datetime.now(timezone.utc)).days}
    except Exception as e:  # noqa: BLE001
        return {"cert_expiry": f"error: {e}", "cert_days_left": None}


def is_expected_404(url: str) -> bool:
    return url.rstrip("/").endswith(EXPECTED_404_SUFFIXES)


def check_hsts(target: str, routes: list[dict]) -> list[str]:
    """GitHub Pages serves a custom domain with no way to set response headers,
    so silo.co.il can never carry HSTS while it is hosted there. Pages does
    enforce HTTPS (https_enforced=true, http redirects to https), which is the
    protection HSTS mostly buys; what is missing is only the hardening of a
    visitor's very first request.

    This was reported as a problem on every deploy from 2026-07-22 until
    2026-08-18. It was never actionable, and a permanent false alarm teaches
    everyone to skim the audit — so it is now stated as a fact, not a problem.
    If the site ever moves behind a CDN that can set headers, delete this
    branch and let the check fail again.
    """
    home_url = target.rstrip("/") + "/"
    home = next((d for d in routes if d["url"] == home_url), None)
    if not home or home.get("status") != 200:
        return ["HSTS check skipped: homepage route not found/reachable"]
    if not home.get("strict_transport_security"):
        print("Note: no HSTS header — GitHub Pages cannot set one on a custom "
              "domain. HTTPS is enforced. Not actionable while hosted here.")
    return []


def check_tabnabbing(target: str, pages: list[str]) -> list[str]:
    problems = []
    base = target.rstrip("/")
    for page in pages:
        url = base + (f"/{page}/" if page else "/")
        try:
            body = fetch_full(url)
        except Exception as e:  # noqa: BLE001
            problems.append(f"tabnabbing check: could not fetch {url}: {e}")
            continue
        for tag in _A_BLANK_TAG.findall(body):
            if not _REL_NOOPENER.search(tag):
                problems.append(f"{url} -> target=_blank link without rel=noopener: {tag[:80]}")
    return problems


def check_same_origin(target: str, pages: list[str]) -> list[str]:
    problems = []
    base = target.rstrip("/")
    own_host = base.split("//")[-1].split("/")[0]
    for page in pages:
        url = base + (f"/{page}/" if page else "/")
        try:
            body = fetch_full(url)
        except Exception as e:  # noqa: BLE001
            problems.append(f"same-origin check: could not fetch {url}: {e}")
            continue
        body_no_ld = _LD_JSON.sub("", body)  # JSON-LD holds schema.org URLs, not loaded resources
        for m in _RESOURCE_SRC.finditer(body_no_ld):
            host = m.group(1).split("//")[-1].split("/")[0]
            if host != own_host:
                problems.append(f"{url} -> third-party resource on a marketing page: {m.group(1)}")
        for link_attrs in _LINK_TAG.findall(body_no_ld):
            rel_m = _LINK_REL.search(link_attrs)
            rel = (rel_m.group(1) if rel_m else "").lower()
            if rel in ("canonical", "alternate", "manifest"):
                continue  # references, not fetched resources for this page
            href_m = _LINK_HREF.search(link_attrs)
            if not href_m:
                continue
            host = href_m.group(1).split("//")[-1].split("/")[0]
            if host != own_host:
                problems.append(f"{url} -> third-party <link rel={rel or '?'}> on a marketing page: {href_m.group(1)}")
    return problems


def check_iframe_allowlist(target: str, pages: list[str]) -> list[str]:
    problems = []
    base = target.rstrip("/")
    for page in pages:
        url = base + f"/{page}/"
        try:
            body = fetch_full(url)
        except Exception as e:  # noqa: BLE001
            problems.append(f"iframe check: could not fetch {url}: {e}")
            continue
        srcs = _IFRAME_SRC.findall(body)
        if not srcs:
            problems.append(f"{url} -> expected a sanctioned vendor iframe, found none")
            continue
        for src in srcs:
            host = src.split("//")[-1].split("/")[0]
            if not (host == ALLOWED_IFRAME_HOST or host.endswith("." + ALLOWED_IFRAME_HOST)):
                problems.append(f"{url} -> iframe src outside the allowlist ({ALLOWED_IFRAME_HOST}): {src}")
    return problems


def check_dist_secrets(dist_dir: str) -> list[str]:
    if not dist_dir or not os.path.isdir(dist_dir):
        return []  # optional — only runs when a local build is given
    problems = []
    for path in glob.glob(os.path.join(dist_dir, "**", "*"), recursive=True):
        if not os.path.isfile(path) or not path.endswith((".html", ".js", ".css", ".json", ".xml", ".txt")):
            continue
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                text = f.read()
        except OSError:
            continue
        for pattern in _SECRET_PATTERNS:
            m = pattern.search(text)
            if m:
                problems.append(f"{path} -> possible secret matching {pattern.pattern[:40]}...")
    return problems


def check_smoke_markup(target: str) -> list[str]:
    """Static presence check only — see the module docstring's KNOWN GAP."""
    problems = []
    base = target.rstrip("/")
    try:
        menu_body = fetch_full(base + "/menu/")
    except Exception as e:  # noqa: BLE001
        return [f"smoke check: could not fetch /menu/: {e}"]
    if 'data-diet="vegan"' not in menu_body:
        problems.append("/menu -> no vegan filter button (data-diet=\"vegan\") found in markup")
    if 'data-diet="gf"' not in menu_body:
        problems.append("/menu -> no gluten-free filter button (data-diet=\"gf\") found in markup")
    for tab_id in ("panel-restaurant", "panel-business", "panel-brunch", "panel-cocktails", "panel-wine", "panel-desserts"):
        if f'id="{tab_id}"' not in menu_body:
            problems.append(f"/menu -> expected tab panel #{tab_id} not found in markup")
    if "aria-controls" not in menu_body:
        problems.append("/menu -> no aria-controls found (mobile-nav toggle wiring may be missing)")
    return problems


def check(target: str, dist_dir: str = "") -> dict:
    routes = [audit_url(u) for u in routes_for(target)]
    shims = [audit_url(u) for u in go_urls(target)]
    for d in shims:
        if d.get("redirect_dest"):
            d["dest_status"] = audit_url(d["redirect_dest"]).get("status")
    host = target.split("//")[-1].split("/")[0]
    cert = cert_info(host)

    problems = []
    for d in routes:
        ok = (d["status"] == 200) or (d["status"] == 404 and is_expected_404(d["url"]))
        if not ok:
            problems.append(f"route {d['url']} -> status={d['status']} error={d.get('error', '')}")
    for d in shims:
        if d["status"] != 200:
            problems.append(f"shim {d['url']} -> status={d['status']}")
        elif not d.get("redirect_dest"):
            problems.append(f"shim {d['url']} -> no baked redirect destination found")
        elif d.get("dest_status") not in (200, 301, 302):
            problems.append(f"shim {d['url']} -> dest {d['redirect_dest']} status={d.get('dest_status')}")
    if cert["cert_days_left"] is not None and cert["cert_days_left"] < 30:
        problems.append(f"TLS cert on {host} expires in {cert['cert_days_left']} days")
    elif cert["cert_days_left"] is None:
        problems.append(f"TLS cert check failed on {host}: {cert['cert_expiry']}")

    problems += check_hsts(target, routes)
    problems += check_tabnabbing(target, MARKETING_PAGES + IFRAME_PAGES)
    problems += check_same_origin(target, MARKETING_PAGES)
    problems += check_iframe_allowlist(target, IFRAME_PAGES)
    problems += check_dist_secrets(dist_dir)
    problems += check_smoke_markup(target)

    return {"target": target, "routes": routes, "shims": shims, "cert": cert, "problems": problems}


def render(result: dict) -> str:
    lines = [f"# SILO pre-launch probe — target {result['target']}", ""]
    lines.append(f"Routes checked: {len(result['routes'])} · /go/* shims: {len(result['shims'])}")
    cert = result["cert"]
    lines.append(f"TLS cert: expires {cert['cert_expiry']} ({cert['cert_days_left']} days left)")
    lines.append("")
    if result["problems"]:
        lines.append(f"## {len(result['problems'])} problem(s)")
        lines += [f"- {p}" for p in result["problems"]]
    else:
        lines.append("## All checks passed — no problems found.")
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--target", default="https://benhasdai.github.io")
    ap.add_argument("--dist", default="", help="local dist/ path to scan for secrets (optional)")
    ap.add_argument("--json", action="store_true", help="emit raw JSON instead of a report")
    ap.add_argument("--url", help="probe a single URL and print its JSON record, then exit")
    args = ap.parse_args()

    if args.url:
        print(json.dumps(audit_url(args.url), ensure_ascii=False, indent=2))
        return

    result = check(args.target, args.dist)
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(render(result))
    sys.exit(1 if result["problems"] else 0)


if __name__ == "__main__":
    main()
