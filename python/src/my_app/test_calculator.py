from pathlib import Path

import pytest
from my_app.calculator import add

def test_add():
    assert add(4, 7) == 11, "Some message here"


# to view all the options: pytest --fixtures
def test_add_from_file(tmp_path: Path):
    with open(tmp_path / "numbers.txt", "w") as fis:
        fis.write("2    3\n")

    with open(tmp_path / "numbers.txt", "r") as fis:
        content = fis.read()
        parts = [int(x) for x in content.split()]

        assert add(*parts) == 5

# Added `fast` in the pyproject.toml
@pytest.mark.fast
def test_marker():
    assert add(4, 7) == 11, "Some message here"

