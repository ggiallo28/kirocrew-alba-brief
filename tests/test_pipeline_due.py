import datetime as dt

from conftest import load

pl = load("alba_pipeline", "crons/pipeline.py")
NOW = dt.datetime(2026, 1, 5, 9, 0).astimezone()   # a Monday


def cfg_with(gen):
    return {"brief": {"generatedAt": gen}}


def test_brief_due_when_none_today():
    assert pl.due_brief({}, {}, NOW, False)


def test_brief_not_due_when_written_today():
    assert not pl.due_brief({}, cfg_with(NOW.isoformat()), NOW, False)


def test_brief_forced():
    assert pl.due_brief({}, cfg_with(NOW.isoformat()), NOW, True)


def test_brief_gives_up_after_three_attempts_today():
    s = {"day": NOW.date().isoformat(), "attempts": 3, "startedAt": 1}
    assert not pl.due_brief(s, {}, NOW, False)


def test_brief_waits_after_a_recent_start(monkeypatch):
    import time
    s = {"startedAt": time.time() - 60}
    assert not pl.due_brief(s, {}, NOW, False)


def test_health_once_a_day():
    assert pl.due_health({}, {}, NOW, False)
    assert not pl.due_health({"day": NOW.date().isoformat()}, {}, NOW, False)


def test_knowledge_only_after_todays_brief():
    assert not pl.due_knowledge({}, {}, NOW, False)
