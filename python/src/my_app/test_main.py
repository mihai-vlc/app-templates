import os


def test_has_env_variables():
    assert os.getenv("APP_LOG_LEVEL") is not None
