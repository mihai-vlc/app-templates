package main

import (
	"fmt"

	"github.com/k0kubun/pp"
)

func main() {
	fmt.Println("Hello sailor!")
	fmt.Println("10 + 20 =", add(10, 20))
	pp.Println(add)
}

func add(a int, b int) int {
	return a + b
}
