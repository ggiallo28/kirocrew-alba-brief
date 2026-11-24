from conftest import load

cf = load("check_format", "skills/alba/scripts/check_format.py")


def brief(**kw):
    b = {"generatedAt": "2026-01-02T08:00:00+00:00", "headline": "Two replies wait and the review is due Friday.",
         "push": {"title": "Reply to the supplier", "body": "They asked on Monday. I can draft it.", "prompt": "Draft the reply."},
         "updates": [{"title": "Invoice paid", "body": "It cleared today.", "space": "Work", "account": "a@b.c"}]}
    b.update(kw)
    return b


def test_clean_brief_passes():
    assert cf.lint(brief(), "en", []) == []


def test_empty_brief_is_not_a_violation():
    assert cf.lint({}, "en", []) == []


def test_long_headline_is_flagged():
    assert cf.lint(brief(headline=" ".join(["word"] * 40)), "en", [])


def test_too_many_updates_is_flagged():
    ups = [{"title": f"Item {i}", "body": "x.", "space": "Work", "account": "a"} for i in range(cf.MAX_UPDATES + 3)]
    assert cf.lint(brief(updates=ups), "en", [])
