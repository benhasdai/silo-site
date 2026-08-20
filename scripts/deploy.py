#!/usr/bin/env python3
"""Deploy SILO: snapshot the current tree, gate it, force-push it.

The public repo (`origin/main` = `benhasdai/benhasdai.github.io`, GitHub
Pages source) always shows exactly ONE commit (owner ruling 2026-07-16).
Local `main` is the real history; this script builds a fresh orphan commit
from `main`'s current state and force-pushes it over `origin/main`.

Gated by two checks before anything touches git or the network:
  1. path denylist — independent of .gitignore, catches the failure mode
     that leaked `.claude/launch.json` + `.claude/settings.json` in the
     first place (a fix landing in .gitignore doesn't help if nobody
     re-runs the snapshot; this also survives .gitignore being weakened
     later without anyone noticing)
  2. source secret-scan — reuses check-site.py's regexes, but against the
     files about to be pushed, not just a built dist/. Nothing today scans
     *source* for an accidentally hardcoded key before it ships.

Requires a clean working tree on `main` (no staged/unstaged/untracked
changes). Deciding what belongs in the next journal commit and writing its
message is a judgment call for whoever's deploying, not this script —
commit on `main` first, then run this.

Usage:
    python3 deploy.py            # gate, then snapshot + force-push + verify
    python3 deploy.py --check    # gate only, push nothing
"""
import argparse
import importlib.util
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]  # silo-site/
SNAPSHOT_BRANCH = "snapshot-tmp"

# Reuse check-site.py's secret regexes by loading it as a module (its
# filename is hyphenated, so a normal `import` statement can't reach it).
_spec = importlib.util.spec_from_file_location("check_site", Path(__file__).parent / "check-site.py")
_check_site = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_check_site)
SECRET_PATTERNS = _check_site._SECRET_PATTERNS

# Independent of .gitignore on purpose — see module docstring.
FORBIDDEN_PATH_PATTERNS = [
    re.compile(r'^\.claude/'),
    re.compile(r'^Claude/'),
    re.compile(r'^skills/'),
    re.compile(r'(^|/)\.env(\..+)?$'),
    re.compile(r'\.md$'),
]

SCANNABLE_SUFFIXES = (
    ".astro", ".ts", ".tsx", ".js", ".mjs", ".json",
    ".css", ".html", ".xml", ".txt", ".yml", ".yaml",
)


def _git(*args: str, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "-C", str(REPO_ROOT), *args], capture_output=True, text=True, check=check)


def working_tree_clean() -> bool:
    return _git("status", "--porcelain").stdout.strip() == ""


def snapshot_files() -> list[str]:
    """Files a fresh `git add -A` would include, respecting .gitignore."""
    out = _git("ls-files", "-c", "-o", "--exclude-standard")
    return [line for line in out.stdout.splitlines() if line]


def check_denylist(paths: list[str]) -> list[str]:
    problems = []
    for path in paths:
        for pattern in FORBIDDEN_PATH_PATTERNS:
            if pattern.search(path):
                problems.append(f"{path} -> matches forbidden path rule {pattern.pattern!r}")
                break
    return problems


def check_secrets(paths: list[str]) -> list[str]:
    problems = []
    for rel in paths:
        if not rel.endswith(SCANNABLE_SUFFIXES):
            continue
        full = REPO_ROOT / rel
        try:
            text = full.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                problems.append(f"{rel} -> possible secret matching {pattern.pattern[:40]}...")
    return problems


def run_gate() -> list[str]:
    paths = snapshot_files()
    return check_denylist(paths) + check_secrets(paths)


def snapshot_and_push() -> None:
    existing = _git("branch", "--list", SNAPSHOT_BRANCH).stdout.strip()
    if existing:
        _git("branch", "-D", SNAPSHOT_BRANCH)
    _git("checkout", "--orphan", SNAPSHOT_BRANCH)
    _git("add", "-A")
    _git("commit", "-m", "SILO site")
    _git("push", "origin", f"{SNAPSHOT_BRANCH}:main", "--force")
    _git("checkout", "main")
    _git("branch", "-D", SNAPSHOT_BRANCH)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="run the pre-push gate only, push nothing")
    args = ap.parse_args()

    problems = run_gate()
    if problems:
        print(f"BLOCKED — {len(problems)} problem(s) found, nothing pushed:")
        for p in problems:
            print(f"  - {p}")
        sys.exit(1)

    print("Gate passed: no forbidden paths, no secret matches.")
    if args.check:
        print("--check: stopping before push.")
        return

    if not working_tree_clean():
        print("BLOCKED — working tree has uncommitted changes. Commit on main first, then re-run.")
        sys.exit(1)

    snapshot_and_push()
    print("Pushed new snapshot to origin/main.")

    print("Running post-deploy health check against the live site...")
    subprocess.run(
        [sys.executable, str(Path(__file__).parent / "check-site.py"), "--target", "https://benhasdai.github.io"],
        check=False,
    )


if __name__ == "__main__":
    main()
