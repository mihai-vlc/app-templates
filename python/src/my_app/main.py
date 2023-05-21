import os
from dotenv import load_dotenv
from my_app.calculator import add

load_dotenv()

if __name__ == "__main__":
    print(f"Calculator app with log level `{os.getenv('APP_LOG_LEVEL')}`")
    a = int(input("a = "))
    b = int(input("b = "))
    print("a + b =", add(a, b))
