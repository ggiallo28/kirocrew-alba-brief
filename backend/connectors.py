"""Read-only connectors for the token-based apps (Notion, Linear, Trello, GitHub) and Outlook (Microsoft Graph).

Pure functions: they receive the secret and return data. Storage of secrets and connections stays in server.py.
Standard library only. Nothing here ever writes to the remote service.
"""
from __future__ import annotations

import datetime as _dt
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request

TOKEN_APPS = ("notion", "linear", "trello", "github")


def _http(url: str, headers: dict | None = None, data: bytes | None = None, method: str | None = None, timeout: int = 20):
    req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        raw = r.read().decode("utf-8")
        return (json.loads(raw) if raw.strip() else {}), r.headers


def _iso_age_days(s: str | None) -> float:
    try:
        d = _dt.datetime.fromisoformat((s or "").replace("Z", "+00:00"))
        return (_dt.datetime.now(_dt.timezone.utc) - d).total_seconds() / 86400
    except Exception:
        return 0.0


def _clip(s: str | None, n: int = 240) -> str:
    s = re.sub(r"\s+", " ", s or "").strip()
    return s[:n] + ("…" if len(s) > n else "")


# ---------------------------------------------------------------- Notion
NOTION_VERSIONS = ("2026-03-11", "2022-06-28")


def _notion(token: str, path: str, body: dict | None = None):
    last: Exception | None = None
    for ver in NOTION_VERSIONS:
        h = {"Authorization": f"Bearer {token}", "Notion-Version": ver, "Content-Type": "application/json"}
        try:
            return _http("https://api.notion.com" + path, h, json.dumps(body).encode() if body is not None else None, "POST" if body is not None else "GET")[0]
        except urllib.error.HTTPError as e:
            if e.code == 400:  # versione non accettata: prova la successiva
                last = e
                continue
            raise
    raise last or RuntimeError("notion")


def notion_verify(token: str) -> str:
    me = _notion(token, "/v1/users/me")
    return me.get("name") or (me.get("bot") or {}).get("workspace_name") or "Notion"


def _notion_title(o: dict) -> str:
    if o.get("object") == "page":
        for p in (o.get("properties") or {}).values():
            if p.get("type") == "title":
                return "".join(t.get("plain_text", "") for t in p.get("title") or []) or "(senza titolo)"
    t = o.get("title")
    if isinstance(t, list):
        return "".join(x.get("plain_text", "") for x in t) or "(senza titolo)"
    return "(senza titolo)"


def notion_snapshot(token: str) -> list[dict]:
    res = _notion(token, "/v1/search", {"sort": {"timestamp": "last_edited_time", "direction": "descending"}, "page_size": 40})
    out = []
    for o in res.get("results") or []:
        edited = o.get("last_edited_time")
        if edited and _iso_age_days(edited) > 7:
            continue
        out.append({"title": _clip(_notion_title(o), 160), "kind": o.get("object"), "edited": edited, "url": o.get("url")})
    return out[:30]


# ---------------------------------------------------------------- Linear
def _linear(token: str, query: str):
    d, _ = _http("https://api.linear.app/graphql", {"Authorization": token, "Content-Type": "application/json"}, json.dumps({"query": query}).encode(), "POST")
    if d.get("errors"):
        raise RuntimeError("linear:" + str((d["errors"][0] or {}).get("message", "error"))[:120])
    return d.get("data") or {}


def linear_verify(token: str) -> str:
    v = _linear(token, "{ viewer { name email } }").get("viewer") or {}
    return v.get("name") or v.get("email") or "Linear"


def linear_snapshot(token: str) -> list[dict]:
    q = "{ viewer { assignedIssues(first: 100, orderBy: updatedAt) { nodes { identifier title url priorityLabel dueDate updatedAt state { name type } team { key } } } } }"
    nodes = ((_linear(token, q).get("viewer") or {}).get("assignedIssues") or {}).get("nodes") or []
    out = []
    for n in nodes:
        st = n.get("state") or {}
        if st.get("type") in ("completed", "canceled"):
            continue
        out.append({"id": n.get("identifier"), "title": _clip(n.get("title"), 200), "team": (n.get("team") or {}).get("key"), "state": st.get("name"),
                    "priority": n.get("priorityLabel"), "due": n.get("dueDate"), "updated": n.get("updatedAt"), "url": n.get("url")})
    return out[:40]


# ---------------------------------------------------------------- Trello
def _trello(secret: str, path: str, params: dict | None = None):
    s = json.loads(secret)
    h = {"Authorization": f'OAuth oauth_consumer_key="{s["key"]}", oauth_token="{s["token"]}"', "Accept": "application/json"}
    q = "?" + urllib.parse.urlencode(params) if params else ""
    return _http("https://api.trello.com/1" + path + q, h)[0]


def trello_verify(key: str, token: str) -> tuple[str, str]:
    secret = json.dumps({"key": key.strip(), "token": token.strip()})
    me = _trello(secret, "/members/me", {"fields": "fullName,username"})
    return me.get("fullName") or me.get("username") or "Trello", secret


def trello_snapshot(secret: str) -> list[dict]:
    cards = _trello(secret, "/members/me/cards", {"filter": "open", "fields": "name,due,dueComplete,url,dateLastActivity", "board": "true", "board_fields": "name", "list": "true", "list_fields": "name"})
    out = []
    for c in cards:
        out.append({"title": _clip(c.get("name"), 200), "board": (c.get("board") or {}).get("name"), "list": (c.get("list") or {}).get("name"),
                    "due": c.get("due"), "dueComplete": bool(c.get("dueComplete")), "updated": c.get("dateLastActivity"), "url": c.get("url")})
    out.sort(key=lambda x: (x["due"] is None, x["due"] or "", ""))
    return out[:40]


# ---------------------------------------------------------------- GitHub
def github_wide(token: str) -> bool:
    """True when the classic token carries more than Alba needs (it only reads notifications and public PRs)."""
    try:
        _, hdr = _gh(token, "/user")
    except Exception:
        return False
    return any(s in (hdr.get("X-OAuth-Scopes") or "").replace(" ", "").split(",") for s in ("repo", "admin:org", "delete_repo", "write:org"))


def _gh(token: str, path: str, params: dict | None = None):
    h = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "alba-brief"}
    q = "?" + urllib.parse.urlencode(params) if params else ""
    return _http("https://api.github.com" + path + q, h)


def github_verify(token: str) -> str:
    me, hdr = _gh(token, "/user")
    scopes = (hdr.get("X-OAuth-Scopes") or "").replace(" ", "")
    if not scopes:
        raise ValueError("github:fine-grained")
    if not any(s in scopes.split(",") for s in ("notifications", "repo")):
        raise ValueError("github:scope")
    return me.get("login") or "GitHub"


def _gh_html(api_url: str | None) -> str | None:
    if not api_url:
        return None
    return re.sub(r"/pulls/", "/pull/", api_url.replace("https://api.github.com/repos/", "https://github.com/"))


def github_snapshot(token: str, org_filter: dict | None = None) -> list[dict]:
    of = org_filter or {}
    orgs = sorted({str(x).strip() for x in (of.get("orgs") or []) if str(x).strip()})
    include = of.get("mode") == "include" and bool(orgs)
    exclude = of.get("mode") == "exclude" and bool(orgs)
    orgs_lower = {o.lower() for o in orgs}

    def _org_of(repo: str | None) -> str:
        return (repo or "").split("/")[0].lower()

    out = []
    # /notifications has no per-org query param, so when a filter is active we have to look past
    # the first page before giving up on an org: the most recent 40 notifications can easily be
    # all from one space, hiding every item from another until we paginate further.
    pages = 5 if (include or exclude) else 1
    for page in range(1, pages + 1):
        batch = _gh(token, "/notifications", {"per_page": 50, "page": page})[0]
        if not batch:
            break
        for n in batch:
            sub = n.get("subject") or {}
            repo = (n.get("repository") or {}).get("full_name")
            if include and _org_of(repo) not in orgs_lower:
                continue
            if exclude and _org_of(repo) in orgs_lower:
                continue
            out.append({"kind": "notification", "reason": n.get("reason"), "repo": repo, "type": sub.get("type"),
                        "title": _clip(sub.get("title"), 200), "updated": n.get("updated_at"), "unread": bool(n.get("unread")), "url": _gh_html(sub.get("url"))})
        if len(batch) < 50:
            break
    # notifications are appended first; without a cap here, a wide filter that paginates up to
    # ~250 of them can fill the final out[:60] on its own and push every PR item out entirely
    out = out[:40]

    for kind, base_q in (("review_requested", "is:pr is:open review-requested:@me"), ("mine", "is:pr is:open author:@me")):
        items = []
        if exclude:
            # the search API supports `-org:x`, so a single AND-of-negations query still works
            q = base_q + "".join(f" -org:{o}" for o in orgs)
            try:
                items = _gh(token, "/search/issues", {"q": q, "per_page": 15, "sort": "updated"})[0].get("items") or []
            except Exception:
                pass
        elif include:
            # one query per org, each in its own try: whether GitHub ORs or ANDs repeated `org:`
            # qualifiers in a single query isn't verified, and a shared try would let one bad org
            # (e.g. SSO-restricted) discard every other org's results for this whole kind
            seen = set()
            for o in orgs:
                try:
                    found = _gh(token, "/search/issues", {"q": f"{base_q} org:{o}", "per_page": 15, "sort": "updated"})[0].get("items") or []
                except Exception:
                    continue
                for i in found:
                    if i.get("id") not in seen:
                        seen.add(i.get("id"))
                        items.append(i)
        else:
            try:
                items = _gh(token, "/search/issues", {"q": base_q, "per_page": 15, "sort": "updated"})[0].get("items") or []
            except Exception:
                pass
        for i in items:
            out.append({"kind": kind, "repo": re.sub(r"^https://api.github.com/repos/", "", i.get("repository_url") or ""), "title": _clip(i.get("title"), 200),
                        "updated": i.get("updated_at"), "url": i.get("html_url")})
    return out[:60]


# ---------------------------------------------------------------- Outlook (Microsoft Graph, device code)
MS_SCOPE = "offline_access User.Read Mail.Read Calendars.Read"


def _tenant(t: str | None) -> str:
    t = (t or "common").strip()
    return t if re.fullmatch(r"[A-Za-z0-9.\-]{3,80}", t) else "common"


def ms_device_start(client_id: str, tenant: str | None) -> dict:
    if not re.fullmatch(r"[0-9a-fA-F-]{36}", (client_id or "").strip()):
        raise ValueError("ms:clientid")
    body = urllib.parse.urlencode({"client_id": client_id.strip(), "scope": MS_SCOPE}).encode()
    d, _ = _http(f"https://login.microsoftonline.com/{_tenant(tenant)}/oauth2/v2.0/devicecode", {"Content-Type": "application/x-www-form-urlencoded"}, body, "POST")
    return d


def _ms_token(client_id: str, tenant: str, form: dict) -> dict:
    body = urllib.parse.urlencode({"client_id": client_id, **form}).encode()
    try:
        return _http(f"https://login.microsoftonline.com/{_tenant(tenant)}/oauth2/v2.0/token", {"Content-Type": "application/x-www-form-urlencoded"}, body, "POST")[0]
    except urllib.error.HTTPError as e:
        try:
            return json.loads(e.read().decode("utf-8", "ignore"))
        except Exception:
            return {"error": f"http_{e.code}"}


def ms_device_poll(client_id: str, tenant: str | None, device_code: str) -> dict:
    return _ms_token(client_id, tenant or "common", {"grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": device_code})


def ms_me(access: str) -> str:
    me, _ = _http("https://graph.microsoft.com/v1.0/me?$select=displayName,mail,userPrincipalName", {"Authorization": f"Bearer {access}"})
    return me.get("mail") or me.get("userPrincipalName") or me.get("displayName") or "Outlook"


def outlook_snapshot(refresh_token: str, client_id: str, tenant: str | None) -> tuple[list[dict], str | None]:
    tok = _ms_token(client_id, tenant or "common", {"grant_type": "refresh_token", "refresh_token": refresh_token, "scope": MS_SCOPE})
    if not tok.get("access_token"):
        raise RuntimeError("ms:" + str(tok.get("error") or "token"))
    h = {"Authorization": f"Bearer {tok['access_token']}", "Prefer": 'outlook.timezone="UTC"'}
    g = "https://graph.microsoft.com/v1.0"
    out = []
    since = (_dt.datetime.now(_dt.timezone.utc) - _dt.timedelta(days=3)).strftime("%Y-%m-%dT%H:%M:%SZ")
    q = urllib.parse.urlencode({"$top": 40, "$orderby": "receivedDateTime desc", "$filter": f"receivedDateTime ge {since}",
                                "$select": "subject,from,receivedDateTime,isRead,bodyPreview,webLink,importance,flag"})
    for m in _http(f"{g}/me/mailFolders/inbox/messages?{q}", h)[0].get("value") or []:
        frm = ((m.get("from") or {}).get("emailAddress") or {})
        out.append({"kind": "mail", "from": f"{frm.get('name', '')} <{frm.get('address', '')}>".strip(), "subject": m.get("subject"), "date": m.get("receivedDateTime"),
                    "snippet": _clip(m.get("bodyPreview"), 240), "unread": not m.get("isRead"), "important": m.get("importance") == "high" or (m.get("flag") or {}).get("flagStatus") == "flagged", "url": m.get("webLink")})
    start = _dt.datetime.now(_dt.timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    cq = urllib.parse.urlencode({"startDateTime": start.strftime("%Y-%m-%dT%H:%M:%SZ"), "endDateTime": (start + _dt.timedelta(days=2)).strftime("%Y-%m-%dT%H:%M:%SZ"),
                                 "$orderby": "start/dateTime", "$top": 30, "$select": "subject,start,end,location,webLink,isAllDay,attendees"})
    for e in _http(f"{g}/me/calendarView?{cq}", h)[0].get("value") or []:
        out.append({"kind": "event", "title": e.get("subject"), "start": (e.get("start") or {}).get("dateTime"), "end": (e.get("end") or {}).get("dateTime"), "allDay": bool(e.get("isAllDay")),
                    "location": (e.get("location") or {}).get("displayName"), "attendees": len(e.get("attendees") or []), "url": e.get("webLink")})
    return out, tok.get("refresh_token")


# ---------------------------------------------------------------- dispatch
def verify(app: str, values: dict) -> tuple[str, str]:
    """Check the credentials against the service. Returns (display name, secret string to store)."""
    v = {k: str(x or "").strip() for k, x in (values or {}).items()}
    if app == "notion":
        return notion_verify(v.get("token", "")), v.get("token", "")
    if app == "linear":
        return linear_verify(v.get("token", "")), v.get("token", "")
    if app == "trello":
        return trello_verify(v.get("key", ""), v.get("token", ""))
    if app == "github":
        return github_verify(v.get("token", "")), v.get("token", "")
    raise ValueError("app non supportata")


def snapshot(app: str, secret: str, org_filter: dict | None = None) -> list[dict]:
    if app == "github":
        return github_snapshot(secret, org_filter)
    return {"notion": notion_snapshot, "linear": linear_snapshot, "trello": trello_snapshot}[app](secret)


ERRORS = {
    "github:fine-grained": "GitHub: serve un token classico (i token a grana fine non leggono le notifiche)",
    "github:scope": "GitHub: al token manca il permesso “notifications”",
    "ms:clientid": "L’ID applicazione Microsoft è un codice di 36 caratteri",
}
