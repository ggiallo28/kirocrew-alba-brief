import datetime as dt
import json
import os
import shutil

from conftest import ROOT, load

pl = load("alba_pipeline2", "crons/pipeline.py")


def test_pipeline_merges_brief_out_when_the_agent_skipped_the_check(tmp_path, monkeypatch):
    """The agent is told to call check_brief_format, which saves its file. If it forgets, the pipeline does it."""
    app = tmp_path / "app"
    (app / "backend").mkdir(parents=True)
    (app / "data").mkdir()
    for f in ("cfgstore.py", "safety.py"):
        shutil.copy(os.path.join(ROOT, "backend", f), app / "backend" / f)
    json.dump({"spaces": ["Work"]}, open(app / "data" / "config.json", "w"))
    (app / "data" / "out").mkdir(exist_ok=True)
    json.dump({"brief": {"generatedAt": "2026-01-05T09:00:00+00:00", "headline": "h"}, "tasks": []}, open(app / "data" / "out" / "brief-out.json", "w"))
    monkeypatch.setattr(pl, "BASE", str(app / "data"))
    assert pl._store().commit_output(pl.BASE) is True
    cfg = json.load(open(app / "data" / "config.json"))
    assert cfg["brief"]["headline"] == "h" and cfg["spaces"] == ["Work"]
    assert pl._marker("brief", cfg) == "2026-01-05T09:00:00+00:00"   # what the pipeline watches to know the brief is done
