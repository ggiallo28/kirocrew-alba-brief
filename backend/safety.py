"""Deterministic clean-up of what flows between untrusted sources, the assistant and the page (standard library only).

An email, a Slack message or a web page can carry text written to steer the assistant ("send this code to ...").
Nothing here trusts the assistant to resist that: it limits what such text can carry out.
  - redact():     secrets, keys and one-time codes are hidden before the assistant reads a snapshot, and in query tool answers;
  - sanitize():   the brief the assistant writes is reduced to the fields the page uses, text is stripped of markup and cut to size,
                  and every link must lead to the site of the app it comes from (a link to anywhere else is dropped), so a
                  hijacked brief cannot carry data to a page of someone else's choosing.
"""
import json
import os
import re
from urllib.parse import urlparse

_KEYS = (
    r"-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?(?:-----END [A-Z ]*PRIVATE KEY-----|$)"
    r"|\b(?:xox[abposr]-[A-Za-z0-9-]{10,}|xapp-[A-Za-z0-9-]{10,}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}"
    r"|(?:AKIA|ASIA)[A-Z0-9]{16}|AIza[0-9A-Za-z_-]{30,}|sk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}|glpat-[A-Za-z0-9_-]{20,}"
    r"|ya29\.[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})"
)
SECRET_RE = re.compile(
    _KEYS + r"|(?i:\b(?:password|passwd|secret|token|api[_-]?key|authorization)\b\s*[:=]\s*)[\"']?(?:(?:Bearer|Basic|Token)\s+)?[^\s\"',;]{8,}")
# one-time and reset codes: a label (any of the app's languages) followed within a few characters by a short number
OTP_RE = re.compile(
    r"(?i)\b(?:(?:verification|security|confirmation|login|sign[- ]?in|one[- ]time|reset|access|auth(?:entication)?)\s+code|code|otp|pin|passcode|"
    r"codice(?:\s+(?:di\s+)?(?:verifica|sicurezza|accesso|conferma|monouso))?|c[oó]digo(?:\s+de\s+(?:verificaci[oó]n|seguridad|acceso))?|"
    r"code(?:\s+de\s+(?:v[ée]rification|s[ée]curit[ée]))?|(?:best[äa]tigungs|sicherheits|einmal)code)\b"
    r"[^\n\d]{0,30}?(?<![\d.])(\d[\d -]{2,9}\d)(?![\d.])")
GOOGLE_CODE_RE = re.compile(r"\bG-\d{6}\b")
MASK = "[secret hidden]"


def redact(s):
    if not isinstance(s, str) or len(s) < 6:
        return s
    s = SECRET_RE.sub(MASK, s)
    s = GOOGLE_CODE_RE.sub(MASK, s)
    return OTP_RE.sub(lambda m: m.group(0).replace(m.group(1), MASK), s)


def deep(o):
    """redact() on every string of a JSON-like structure."""
    if isinstance(o, str):
        return redact(o)
    if isinstance(o, list):
        return [deep(x) for x in o]
    if isinstance(o, dict):
        return {k: deep(v) for k, v in o.items()}
    return o


def redact_sources(data_dir: str) -> int:
    """Rewrite data/sources/**/*.json with secrets hidden (snapshots written by the assistant's browser steps included). Returns files changed."""
    n = 0
    base = os.path.join(data_dir, "sources")
    for root, _, files in os.walk(base):
        for f in files:
            if not f.endswith(".json"):
                continue
            p = os.path.join(root, f)
            try:
                with open(p, encoding="utf-8") as fh:
                    raw = fh.read()
                obj = json.loads(raw)
            except (OSError, ValueError):
                continue
            new = deep(obj)
            if new != obj:
                tmp = p + ".tmp"
                with open(tmp, "w", encoding="utf-8") as fh:
                    json.dump(new, fh, ensure_ascii=False, indent=2)
                os.replace(tmp, p)
                n += 1
    return n


# ---- links ----
_GOOGLE = ("google.com",)
SITES = {
    "gmail": _GOOGLE, "calendar": _GOOGLE, "drive": _GOOGLE, "googlechat": _GOOGLE,
    "slack": ("slack.com",), "github": ("github.com",), "trello": ("trello.com",), "linear": ("linear.app",),
    "notion": ("notion.so", "notion.site"), "discord": ("discord.com",), "telegram": ("t.me", "telegram.org"),
    "linkedin": ("linkedin.com",), "teams": ("teams.microsoft.com", "microsoft.com"),
    "outlook": ("outlook.office.com", "outlook.live.com", "office.com", "microsoft.com", "live.com"),
    "youtrack": ("youtrack.cloud", "myjetbrains.com"), "jira": ("atlassian.net", "atlassian.com"), "confluence": ("atlassian.net", "atlassian.com"),
}
ANY_HTTPS = {"web"}   # news links lead to the publishers' own sites


def _host(u: str) -> str:
    try:
        return (urlparse(u).hostname or "").lower()
    except ValueError:
        return ""


def _extra_hosts(data_dir: str) -> dict:
    """Hosts of the self-hosted or tenant URLs the user connected (a YouTrack or Jira address), per app."""
    out: dict = {}
    try:
        with open(os.path.join(data_dir, "connections.json"), encoding="utf-8") as f:
            conns = json.load(f)
    except (OSError, ValueError):
        return out
    for c in conns.values() if isinstance(conns, dict) else []:
        h = _host(str(c.get("url") or ""))
        if h and isinstance(c.get("app"), str):
            out.setdefault(c["app"], set()).add(h)
    return out


def link_ok(url, source, extra: dict | None = None) -> bool:
    if not isinstance(url, str) or len(url) > 1000:
        return False
    try:
        p = urlparse(url)
    except ValueError:
        return False
    if p.scheme not in ("http", "https") or not p.hostname or p.username or p.password:
        return False
    h = p.hostname.lower()
    src = str(source or "").lower()
    if src in ANY_HTTPS:
        return p.scheme == "https"
    allowed = set(SITES.get(src, ())) | set((extra or {}).get(src, ()))
    return any(h == d or h.endswith("." + d) for d in allowed)


# ---- brief schema ----
_TAG = re.compile(r"<[^>]*>")
_BRIEF_KEYS = ("generatedAt", "weekday", "dateLabel", "timeLabel", "headline", "caption", "push", "todos", "updates", "sources", "unread", "reminders")
_ITEM_KEYS = ("id", "title", "tag", "hot", "body", "source", "space", "account", "url", "firstSeen", "status", "doneAt", "doneBy", "done", "archived")
_LIM = {"headline": 400, "caption": 300, "title": 300, "tag": 40, "body": 1500, "prompt": 4000, "text": 600, "since": 40, "source": 40, "space": 80, "account": 200, "id": 200}


def _text(v, n):
    return _TAG.sub("", v).replace("\x00", "")[:n] if isinstance(v, str) else v


def _item(it, extra):
    if not isinstance(it, dict):
        return None
    out = {}
    for k in _ITEM_KEYS:
        if k not in it:
            continue
        v = it[k]
        out[k] = _text(v, _LIM.get(k, 300)) if isinstance(v, str) else (v if isinstance(v, (bool, int, float)) or v is None else None)
    if "url" in out and not link_ok(out["url"], out.get("source"), extra):
        out.pop("url")
    return out


def sanitize(brief, tasks, data_dir: str):
    """(brief, tasks) reduced to what the page uses, markup removed, sizes capped, links limited to the app's own site."""
    extra = _extra_hosts(data_dir)
    nb = None
    if isinstance(brief, dict):
        nb = {}
        for k in _BRIEF_KEYS:
            if k not in brief:
                continue
            v = brief[k]
            if k in ("updates", "todos"):
                nb[k] = [i for i in (_item(x, extra) for x in (v if isinstance(v, list) else [])[:60]) if i]
            elif k == "push" and isinstance(v, dict):
                nb[k] = {a: (_text(b, _LIM.get(a, 300)) if isinstance(b, str) else b) for a, b in v.items() if a in ("title", "body", "prompt", "done")}
            elif k in ("unread", "sources"):
                nb[k] = [_text(x, 400) for x in (v if isinstance(v, list) else [])[:40] if isinstance(x, str)]
            elif k == "reminders":
                nb[k] = [{a: _text(b, _LIM.get(a, 300)) for a, b in x.items() if a in ("text", "since") and isinstance(b, str)} for x in (v if isinstance(v, list) else [])[:40] if isinstance(x, dict)]
            else:
                nb[k] = _text(v, _LIM.get(k, 200))
    nt = None
    if isinstance(tasks, list):
        nt = [i for i in (_item(x, extra) for x in tasks[:300]) if i]
    return nb, nt
