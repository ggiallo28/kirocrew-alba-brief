"""Alba sign-in health check: plain code, no LLM, no tokens.

For every enabled account that Alba reads from the browser it opens the app page in Crew's
browser, looks at the page outline and records ok / signin / error in `health` of Alba's
config. It reads nothing from the page beyond "is this account signed in", never clicks and
never types.
"""
from __future__ import annotations

import json
import os
import re
import time
import urllib.request
from urllib.parse import quote

from kiro_crew.cron_script import Done

CFG = os.path.expanduser("~/.kiro/crew/apps/alba/data/config.json")
LOCATION_MAX_AGE_DAYS = 14  # the machine rarely moves: no need to look this up on every run
PAGES = {
    "gmail": "https://mail.google.com/mail/?authuser={e}",
    "calendar": "https://calendar.google.com/calendar/u/0/r/day?authuser={e}",
    "drive": "https://drive.google.com/drive/recent?authuser={e}",
    "slack": "https://app.slack.com/client",
    "linkedin": "https://www.linkedin.com/dashboard/",
    "notion": "https://www.notion.so/",
    "linear": "https://linear.app/",
    "trello": "https://trello.com/",
    "github": "https://github.com/notifications",
    "outlook": "https://outlook.office.com/mail/",
    "teams": "https://teams.microsoft.com/",
    "telegram": "https://web.telegram.org/",
}
GOOGLE = {"gmail", "calendar", "drive"}
SIGNIN = re.compile(r"sign in|signin|log ?in|accedi|choose an account|scegli un account|use another account|usa un altro account|password|create account|crea account", re.I)


def _browser(ctx, op, **args):
    return ctx.call_tool("kirocrew-core", "browser", {"op": op, "args": args})


def _fetch_location() -> dict | None:
    """Province-level location from the machine's own public IP (never the exact address): shown on the brief page as a light touch, not for anything else.
    A plain IP-geolocation API's own `city` guess is unreliable for ISPs that route a whole rural area through one IP
    block (three different providers gave three different small towns for the same connection, all just noise): asking
    only for lat/lon from the IP lookup, then reverse-geocoding that point to its county/province (a coarser, more
    stable area that does not flip depending on which exact town the ISP's IP happens to be registered under)."""
    try:
        with urllib.request.urlopen("http://ip-api.com/json/", timeout=6) as r:
            ip = json.load(r)
        if ip.get("status") != "success":
            return None
        lat, lon, country = ip.get("lat"), ip.get("lon"), (ip.get("countryCode") or "").strip()
        if lat is None or lon is None:
            return {"region": "", "country": country} if country else None
        geo_req = urllib.request.Request(
            f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=jsonv2&zoom=8",
            headers={"User-Agent": "Alba (personal Kiro Crew app, local use) - contact: the app owner"},
        )
        with urllib.request.urlopen(geo_req, timeout=6) as r:
            geo = json.load(r)
        addr = geo.get("address") or {}
        province = (addr.get("county") or addr.get("state_district") or addr.get("state") or "").strip()
        return {"region": province, "country": country} if (province or country) else None
    except Exception:
        return None


def _location_update(cur: dict) -> dict | None:
    """None if the cached location is still fresh enough (no need to look it up on every run)."""
    loc = cur.get("location") or {}
    age_days = 999
    try:
        if loc.get("fetchedAt"):
            age_days = (time.time() - time.mktime(time.strptime(loc["fetchedAt"], "%Y-%m-%dT%H:%M:%S"))) / 86400
    except Exception:
        pass
    if loc.get("region") and age_days < LOCATION_MAX_AGE_DAYS:
        return None
    fresh = _fetch_location()
    if not fresh:
        return None
    fresh["fetchedAt"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    return fresh


def _check(ctx, app: str, label: str) -> tuple[str, str]:
    url = PAGES[app].format(e=quote(label, safe="@"))
    try:
        nav = _browser(ctx, "navigate", url=url)
        _browser(ctx, "wait_for", load=True)
        snap = _browser(ctx, "snapshot")
    except Exception as exc:  # browser missing, blocked, timeout…
        return "error", re.sub(r"\s+", " ", str(exc))[:120]
    text = f"{nav}\n{snap}"
    if re.search(r"not_installed|not installed|supervisor unavailable|policy_denied", text, re.I) and len(text) < 600:
        return "error", "browser non disponibile"
    m = re.search(r'"url":\s*"([^"]+)"', str(nav))
    final = m.group(1) if m else (re.search(r"https?://\S+", str(snap)) or [""])[0]
    if app in GOOGLE:
        if "accounts.google.com" in final.lower():
            return "signin", ""
        if label.lower() in snap.lower():
            return "ok", ""
        other = re.search(r"\(([^()\s]+@[^()\s]+)\)", snap) or re.search(r"[-\u2013]\s*([^\s]+@[^\s]+)\s*[-\u2013]\s", str(snap)[:300])
        if other:
            return "signin", "connesso un altro account: " + other.group(1)
        return "error", "account non riconosciuto nella pagina"
    if re.search(r"/(login|signin|sign-in|auth)\b", final, re.I) or SIGNIN.search(snap[:1500]) and len(snap) < 4000:
        return "signin", ""
    if app == "discord" and not re.search(r"server|servidor|serveur|direct messages|messaggi diretti|inbox|posta in arrivo|add a server|aggiungi un server", snap, re.I):
        return "error", "interfaccia non caricata: nessuna lista dei server"
    return ("ok", "") if len(snap) > 200 else ("error", "pagina vuota")


def run(ctx):
    dry = (getattr(ctx, "message", "") or "").strip() == "dry"
    try:
        with open(CFG, encoding="utf-8") as f:
            cfg = json.load(f)
    except Exception:
        raise Done("config Alba non leggibile")
    results = {}
    for app, lst in (cfg.get("accounts") or {}).items():
        if app == "web":   # nothing to sign in to: a watch is ready as soon as it exists
            for a in lst or []:
                if a.get("enabled", True):
                    results[a["id"]] = {"status": "ok", "checkedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z") or time.strftime("%Y-%m-%dT%H:%M:%S")}
            continue
        if app in ("folder", "claudecode", "kiro"):
            for a in lst or []:
                if not a.get("enabled", True):
                    continue
                p = os.path.expanduser(a.get("label", ""))
                if not os.path.isdir(p):
                    status, detail = "error", "cartella non trovata"
                elif not os.access(p, os.R_OK):
                    status, detail = "error", "cartella non leggibile"
                else:
                    status, detail = "ok", ""
                results[a["id"]] = {"status": status, "checkedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z") or time.strftime("%Y-%m-%dT%H:%M:%S"), **({"detail": detail} if detail else {})}
            continue
        if app not in PAGES or app in ("gmail", "calendar", "drive", "youtrack", "slack", "notion", "linear", "trello", "github", "outlook"):
            continue  # hanno un collegamento proprio, con il suo stato
        for a in lst or []:
            if not a.get("enabled", True):
                continue  # ogni app senza connettore dedicato si legge dalla pagina, qualunque sia il metodo scelto
            status, detail = _check(ctx, app, a.get("label", ""))
            results[a["id"]] = {"status": status, "checkedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z") or time.strftime("%Y-%m-%dT%H:%M:%S"), **({"detail": detail} if detail else {})}
    if dry:
        if not results:
            raise Done("nessun account da verificare")
        raise Done("dry: " + json.dumps(results))
    # rilegge subito prima di scrivere: cambia solo `health` e, raramente, `location`
    with open(CFG, encoding="utf-8") as f:
        cur = json.load(f)
    new_loc = _location_update(cur)
    if not results and not new_loc:
        raise Done("nessun account da verificare")
    cur["health"] = {**(cur.get("health") or {}), **results}
    if new_loc:
        cur["location"] = new_loc
    tmp = CFG + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cur, f, ensure_ascii=False, indent=2)
    os.replace(tmp, CFG)
    raise Done("verificati: " + ", ".join(f"{k}={v['status']}" for k, v in results.items()))
