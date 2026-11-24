import json
import multiprocessing
import os
import time

from conftest import load

store = load("cfgstore", "backend/cfgstore.py")


def _bump(args):
    path, key = args
    for _ in range(25):
        store.update(path, lambda c: c.__setitem__(key, c.get(key, 0) + 1))


def test_concurrent_updates_lose_nothing(tmp_path):
    p = str(tmp_path / "config.json")
    json.dump({"spaces": ["Work"]}, open(p, "w"))
    with multiprocessing.get_context("spawn").Pool(4) as pool:
        pool.map(_bump, [(p, "a"), (p, "b"), (p, "a"), (p, "b")])
    c = json.load(open(p))
    assert c["a"] == 50 and c["b"] == 50 and c["spaces"] == ["Work"]


def test_update_skips_write_when_unchanged(tmp_path):
    p = str(tmp_path / "config.json")
    json.dump({"x": 1}, open(p, "w"))
    before = os.stat(p).st_mtime_ns
    time.sleep(0.01)
    store.update(p, lambda c: None)
    assert os.stat(p).st_mtime_ns == before


def test_commit_output_keeps_what_changed_meanwhile(tmp_path):
    d = str(tmp_path)
    json.dump({"spaces": ["Work"], "reminders": [{"id": "r1", "text": "t", "status": "pending"}]}, open(d + "/config.json", "w"))
    os.makedirs(d + "/out", exist_ok=True)
    json.dump({"brief": {"generatedAt": "2026-01-02T08:00:00+00:00"}, "tasks": [{"id": "t1"}], "delivered": ["r1"]}, open(d + "/out/brief-out.json", "w"))
    # a reminder saved while the agent was working
    store.add_reminder(d, "buy milk", "2026-01-03")
    assert store.commit_output(d) is True
    c = json.load(open(d + "/config.json"))
    assert c["brief"]["generatedAt"].startswith("2026-01-02") and c["tasks"] == [{"id": "t1"}] and c["spaces"] == ["Work"]
    assert [r["text"] for r in c["reminders"] if r["status"] == "pending"] == ["buy milk"]
    assert [r["id"] for r in c["reminders"] if r["status"] == "delivered"] == ["r1"]
    assert store.commit_output(d) is False   # same file again: nothing to do


def test_commit_output_ignores_broken_file(tmp_path):
    d = str(tmp_path)
    json.dump({"a": 1}, open(d + "/config.json", "w"))
    os.makedirs(d + "/out", exist_ok=True)
    open(d + "/out/brief-out.json", "w").write("{not json")
    assert store.commit_output(d) is False
    assert json.load(open(d + "/config.json")) == {"a": 1}


def test_old_delivered_reminders_are_pruned(tmp_path):
    d = str(tmp_path)
    json.dump({"reminders": [{"id": "old", "status": "delivered", "deliveredAt": "2000-01-01"}]}, open(d + "/config.json", "w"))
    os.makedirs(d + "/out", exist_ok=True)
    json.dump({"brief": {"generatedAt": "x"}}, open(d + "/out/brief-out.json", "w"))
    store.commit_output(d)
    assert json.load(open(d + "/config.json"))["reminders"] == []


def test_relative_path_works(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    json.dump({"x": 1}, open("config.json", "w"))
    store.update("config.json", lambda c: c.__setitem__("y", 2))
    assert json.load(open("config.json")) == {"x": 1, "y": 2}


def test_closed_tasks_survive_a_run_that_leaves_them_out(tmp_path):
    d = str(tmp_path)
    today = time.strftime("%Y-%m-%d")
    json.dump({"tasks": [{"id": "a", "status": "done", "doneAt": today}, {"id": "b", "status": "dismissed", "doneAt": today},
                         {"id": "c", "status": "done", "doneAt": "2000-01-01"}, {"id": "d", "status": "open"}]}, open(d + "/config.json", "w"))
    os.makedirs(d + "/out", exist_ok=True)
    json.dump({"brief": {"generatedAt": "x"}, "tasks": [{"id": "e", "status": "open"}]}, open(d + "/out/brief-out.json", "w"))
    store.commit_output(d)
    ids = sorted(t["id"] for t in json.load(open(d + "/config.json"))["tasks"])
    assert ids == ["a", "b", "e"]   # recent closed ones kept; the 2000 one pruned; the open one "d" is the agent's to carry, it left it out


def test_replaced_brief_is_archived_once_per_day(tmp_path):
    d = str(tmp_path)
    os.makedirs(d + "/out", exist_ok=True)
    json.dump({"brief": {"generatedAt": "2026-01-02T08:00:00+00:00", "headline": "old"}}, open(d + "/config.json", "w"))
    json.dump({"brief": {"generatedAt": "2026-01-03T08:00:00+00:00", "headline": "new"}}, open(d + "/out/brief-out.json", "w"))
    store.commit_output(d)
    h = json.load(open(d + "/history.json"))["briefs"]
    assert [b["date"] for b in h] == ["2026-01-02"] and h[0]["brief"]["headline"] == "old"
    time.sleep(0.01)
    json.dump({"brief": {"generatedAt": "2026-01-03T09:00:00+00:00", "headline": "newer"}}, open(d + "/out/brief-out.json", "w"))
    store.commit_output(d)   # a refresh the same day archives the same-day brief only if its date is new
    h = json.load(open(d + "/history.json"))["briefs"]
    assert [b["date"] for b in h] == ["2026-01-03", "2026-01-02"]
