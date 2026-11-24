import importlib.util
import os
import sys
import types

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "backend"))


def load(name, rel, env=None):
    """Import a module of the app by path (the app is not a package)."""
    spec = importlib.util.spec_from_file_location(name, os.path.join(ROOT, rel))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


# the Crew runtime is not installed where the tests run: a stand-in with the two exceptions the cron scripts use
if "kiro_crew" not in sys.modules:
    pkg = types.ModuleType("kiro_crew")
    cs = types.ModuleType("kiro_crew.cron_script")
    cs.Done = type("Done", (Exception,), {})
    cs.Skip = type("Skip", (Exception,), {})
    pkg.cron_script = cs
    sys.modules["kiro_crew"] = pkg
    sys.modules["kiro_crew.cron_script"] = cs
