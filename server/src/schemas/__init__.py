"""Compatibility exports for the application's API and feature schemas.

The project keeps its original API models in ``src/schemas.py`` while newer
feature modules import models such as ``src.schemas.auth``.  Loading the
original module here lets both import styles remain available.
"""

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
import sys


_legacy_module_name = "src._legacy_schemas"
_legacy_path = Path(__file__).resolve().parents[1] / "schemas.py"
_spec = spec_from_file_location(_legacy_module_name, _legacy_path)

if _spec is None or _spec.loader is None:
    raise ImportError("Could not load the application API schemas")

_legacy = module_from_spec(_spec)
sys.modules[_legacy_module_name] = _legacy
_spec.loader.exec_module(_legacy)

for _name in dir(_legacy):
    if not _name.startswith("_"):
        globals()[_name] = getattr(_legacy, _name)

