from dotenv import load_dotenv

load_dotenv()

import os
from my_app.calculator import add
from my_app.logger import logger


def main():
    logger.debug("starting the app")

    print(f"Calculator app with log level `{os.getenv('APP_LOG_LEVEL')}`")
    a = int(input("a = "))
    b = int(input("b = "))
    rez = add(a, b)

    logger.info(f"result calculated, {a= }, {b= }, {rez= }")

    print("a + b =", rez)
    return 0


if __name__ == "__main__":
    try:
        exit(main())
    except Exception as e:
        logger.exception("main crashed. Error: %s", e)
