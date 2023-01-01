async function main() {
    console.log("Hello sailor!");
    console.log("10 + 20 =", add(10, 20));
}

main().catch(console.error);

export function add(a: number, b: number) {
    return a + b;
}
