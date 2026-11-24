import re

from conftest import ROOT, load

C = load("alba_connectors", "backend/connectors.py")


def test_github_wide_token_detected(monkeypatch):
    monkeypatch.setattr(C, "_gh", lambda token, path, params=None: ({"login": "x"}, {"X-OAuth-Scopes": "notifications, repo"}))
    assert C.github_wide("t") is True


def test_github_notifications_only_is_not_wide(monkeypatch):
    monkeypatch.setattr(C, "_gh", lambda token, path, params=None: ({"login": "x"}, {"X-OAuth-Scopes": "notifications"}))
    assert C.github_wide("t") is False


def test_github_wide_check_never_raises(monkeypatch):
    def boom(*a, **k):
        raise OSError("offline")
    monkeypatch.setattr(C, "_gh", boom)
    assert C.github_wide("t") is False


def test_setup_page_has_the_warning_in_every_language():
    src = open(ROOT + "/web/lang.js", encoding="utf-8").read()
    langs = re.findall(r'^ "(it|en|es|fr|de|pt)": \{', src, re.M)
    assert sorted(langs) == ["de", "en", "es", "fr", "it", "pt"]
    assert src.count('"ghWide":') == 6
