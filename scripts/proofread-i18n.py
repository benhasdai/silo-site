#!/usr/bin/env python3
"""Proofread the site's RU/EN translations against the Hebrew source, using
Google AI Studio's lean model (Gemini Flash-Lite) — no Claude/Willow in the
judgment loop (owner's "clean of our model" rule, same as catalog.py).

Hebrew is the source of truth in every i18n table. This sends each i18n page
file to Gemini and asks ONLY for real errors: mistranslations, wrong meaning,
unnatural phrasing, dropped nuance. It writes a human-readable report; it never
edits the source files — fixing is a separate, reviewed step.

Auth: the Google AI Studio key in the willow-vault (`general-key.enc`,
confirmed by owner 2026-07-23). Sent as the `x-goog-api-key` HEADER, never in
the URL query string (credentials never in URL params). The key is never
printed — printing key material trips the auto-mode secret classifier and is
wrong regardless.

Google's free tier is a separate quota from OpenRouter, so this runs even when
the OpenRouter catalog job is rate-limited.

Usage:
    python3 proofread-i18n.py            # proofread all i18n page files
    python3 proofread-i18n.py --file club.ts giftcard.ts
"""
import argparse
import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]          # silo-site/
I18N = REPO / "src" / "i18n" / "pages"
REPORT = Path(__file__).resolve().parent.parent / "off" / "proofread-report.md"

VAULT = Path.home() / ".claude" / "secrets" / "willow-vault"
VAULT_KEY = VAULT / "general-key.enc"                # Google AI Studio key
VAULT_PASS = VAULT / ".pass"

MODEL = "gemini-flash-lite-latest"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

PROMPT = """You are proofreading the internationalization (i18n) strings for an Italian-Mediterranean restaurant website called SILO. The file below is a TypeScript object with three locales: `he` (Hebrew — the SOURCE OF TRUTH), `en` (English), and `ru` (Russian).

Compare the `en` and `ru` strings against their `he` source. Report ONLY genuine problems: mistranslations, wrong meaning, factual drift from the Hebrew, grammatically wrong or unnatural phrasing, or dropped nuance that matters. Do NOT report stylistic preferences, and do NOT report anything where the translation is already fine.

Return a JSON array. Each element:
{"key": "the object path, e.g. hero.lead", "locale": "en" or "ru", "he": "the Hebrew source string", "current": "the current translation", "issue": "what's wrong, in English", "suggestion": "a corrected translation"}

If there are no problems in this file, return an empty array [].

FILE:
"""

RESPONSE_SCHEMA = {
    "type": "ARRAY",
    "items": {
        "type": "OBJECT",
        "properties": {
            "key": {"type": "STRING"},
            "locale": {"type": "STRING"},
            "he": {"type": "STRING"},
            "current": {"type": "STRING"},
            "issue": {"type": "STRING"},
            "suggestion": {"type": "STRING"},
        },
        "required": ["key", "locale", "issue", "suggestion"],
    },
}


def decrypt_key() -> str:
    out = subprocess.run(
        ["openssl", "enc", "-aes-256-cbc", "-pbkdf2", "-iter", "200000", "-d",
         "-in", str(VAULT_KEY), "-pass", f"file:{VAULT_PASS}"],
        capture_output=True, text=True,
    )
    if out.returncode != 0 or not out.stdout.strip():
        sys.exit(f"Failed to decrypt Google key: {out.stderr.strip()}")
    return out.stdout.strip()


def proofread(text: str, api_key: str) -> list | dict:
    body = json.dumps({
        "contents": [{"parts": [{"text": PROMPT + text}]}],
        "generationConfig": {
            "temperature": 0,
            "maxOutputTokens": 4000,
            "responseMimeType": "application/json",
            "responseSchema": RESPONSE_SCHEMA,
        },
    }).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
        method="POST",
    )
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read())
            parts = data["candidates"][0]["content"]["parts"]
            txt = "".join(p.get("text", "") for p in parts)
            return json.loads(txt)
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")[:300]
            if e.code == 429:
                return {"error": "rate_limit", "detail": detail}
            if attempt < 3:
                time.sleep(3)
                continue
            return {"error": f"HTTP {e.code}", "detail": detail}
        except Exception as e:
            if attempt < 3:
                time.sleep(3)
                continue
            return {"error": str(e)}
    return {"error": "exhausted retries"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", nargs="*", help="specific i18n filenames (default: all)")
    ap.add_argument("--sleep", type=float, default=1.0)
    args = ap.parse_args()

    files = ([I18N / f for f in args.file] if args.file else sorted(I18N.glob("*.ts")))
    files = [f for f in files if f.exists()]
    if not files:
        sys.exit(f"No i18n files found in {I18N}")

    api_key = decrypt_key()
    print(f"Proofreading {len(files)} files with {MODEL}\n")

    lines = [f"# Translation proofread report", "",
             f"Model: `{MODEL}` (Google AI Studio) · source of truth: Hebrew · {time.strftime('%Y-%m-%d %H:%M')}",
             "", "RU/EN issues against the Hebrew source. Suggestions are the model's,",
             "not applied — review before editing the source files.", ""]
    total = 0
    for f in files:
        print(f"  {f.name} ...", end=" ", flush=True)
        result = proofread(f.read_text(encoding="utf-8"), api_key)
        if isinstance(result, dict) and result.get("error"):
            print(f"ERROR: {result['error']}")
            lines.append(f"## {f.name}\n\n⚠️ {result['error']}: {result.get('detail','')}\n")
            if result["error"] == "rate_limit":
                break
            continue
        issues = result if isinstance(result, list) else []
        total += len(issues)
        print(f"{len(issues)} issue(s)")
        lines.append(f"## {f.name} — {len(issues)} issue(s)\n")
        for it in issues:
            lines.append(f"- **`{it.get('key','?')}` ({it.get('locale','?')})** — {it.get('issue','')}")
            lines.append(f"  - HE: {it.get('he','')}")
            lines.append(f"  - now: {it.get('current','')}")
            lines.append(f"  - suggest: {it.get('suggestion','')}")
        lines.append("")
        time.sleep(args.sleep)

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(lines), encoding="utf-8")
    print(f"\n{total} total issue(s). Report: {REPORT}")


if __name__ == "__main__":
    main()
