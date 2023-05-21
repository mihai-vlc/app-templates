from my_app.calculator import add

if __name__ == "__main__":
    print("Calculator app")
    a = int(input("a = "))
    b = int(input("b = "))
    print("a + b =", add(a, b))
