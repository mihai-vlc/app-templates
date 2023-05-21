from logging import (
    Formatter,
    getLogger,
    FileHandler,
    StreamHandler,
)
import os
import sys

APP_LOG_LEVEL = os.getenv("APP_LOG_LEVEL") or "DEBUG"

formatter = Formatter("%(asctime)s | %(levelname)s | %(message)s")

logger = getLogger("my_app")
logger.setLevel(APP_LOG_LEVEL)

stdout_handler = StreamHandler(sys.stdout)
stdout_handler.setLevel(APP_LOG_LEVEL)
stdout_handler.setFormatter(formatter)
logger.addHandler(stdout_handler)

file_handler = FileHandler("app.log")
file_handler.setLevel(APP_LOG_LEVEL)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
