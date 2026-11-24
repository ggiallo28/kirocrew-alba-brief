import os

import pytest

from conftest import load


@pytest.fixture(scope="module")
def srv(tmp_path_factory):
    os.environ["ALBA_DATA_DIR"] = str(tmp_path_factory.mktemp("data"))
    return load("alba_server", "backend/server.py")


def test_pattern_include_exclude(srv):
    ok = srv._pattern_ok
    assert ok("notes/a.md", [], [])
    assert ok("notes/a.md", ["*.md"], [])
    assert not ok("notes/a.txt", ["*.md"], [])
    assert not ok("notes/draft-1.md", ["*.md"], ["*draft*"])
    assert not ok("archive/x.md", [], ["archive"])
    assert ok("x/y/readme.md", ["readme.md"], [])


@pytest.mark.parametrize("raw", [
    "xoxp-1234567890-abcdefghij", "ghp_" + "a" * 36, "AKIAABCDEFGHIJKLMNOP", "sk-ant-" + "b" * 30,
    "password: hunter2hunter2", "Authorization: Bearer abcdefgh12345678",
    "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----",
])
def test_redact_hides_secrets(srv, raw):
    out = srv._redact("before " + raw + " after")
    assert "[secret hidden]" in out and "before" in out and "after" in out
    assert "hunter2hunter2" not in out and "abcdefgh12345678" not in out


def test_redact_leaves_normal_text(srv):
    t = "The token count is 5 and the password policy changes on Monday."
    assert srv._redact(t) == t


def test_kiro_session_lines_are_readable(srv):
    import json
    lines = [
        {"payload": {"type": "session_metadata", "key": "x"}},
        {"payload": {"type": "user", "content": "[SESSION CONTEXT] lots of context\n[CURRENT USER REQUEST -- respond to this]\nplease fix the login page"}},
        {"payload": {"type": "tool_call", "toolName": "read_file"}},
        {"payload": {"type": "assistant", "content": "I fixed the redirect after login."}},
    ]
    txt = srv._jsonl_text("\n".join(json.dumps(x) for x in lines))
    assert txt == "user: please fix the login page\nassistant: I fixed the redirect after login."


def test_github_save_reports_a_wide_token(srv, monkeypatch, tmp_path):
    import time
    monkeypatch.setattr(srv, "DATA", str(tmp_path))
    monkeypatch.setattr(srv, "CONN", str(tmp_path / "connections.json"))
    (tmp_path / "config.json").write_text('{"accounts": {"github": [{"id": "g1", "label": "me", "space": "Work", "enabled": true}]}, "spaces": ["Work"]}')
    srv.SETUP["tok"] = {"ids": ["g1"], "lang": "en", "ts": time.time()}
    monkeypatch.setattr(srv.C, "verify", lambda app, vals: ("me", "secret"))
    monkeypatch.setattr(srv, "secret_put", lambda *a, **k: None)
    monkeypatch.setattr(srv, "refresh", lambda acc: {"ok": True})
    monkeypatch.setattr(srv.C, "github_wide", lambda t: True)
    st, out = srv.setup_save("tok", "g1", "", values={"token": "x"})
    assert st == 200 and out["ok"] and out["wide"] is True
    monkeypatch.setattr(srv.C, "github_wide", lambda t: False)
    st, out = srv.setup_save("tok", "g1", "", values={"token": "x"})
    assert "wide" not in out


def test_task_state_keeps_the_archived_flag(srv, monkeypatch, tmp_path):
    monkeypatch.setattr(srv, "DATA", str(tmp_path))
    monkeypatch.setattr(srv, "TASK_STATE", str(tmp_path / "task-state.json"))
    srv.task_state_set({"id": "t1", "title": "x", "status": "done", "archived": True})
    srv.task_state_set({"id": "t2", "title": "y", "status": "done"})
    st = srv.task_state_load()
    assert st["t1"]["archived"] is True and st["t1"]["status"] == "done" and "archived" not in st["t2"]
    srv.task_state_set({"id": "t1", "status": "open"})   # reopening forgets everything, the flag included
    assert "t1" not in srv.task_state_load()
