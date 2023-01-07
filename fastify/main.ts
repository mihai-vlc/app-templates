import fastify from "fastify";

async function main() {
    require("dotenv").config();
    const server = fastify();

    server.get("/ping", async (request, reply) => {
        return "pong\n";
    });

    const port = Number(process.env.PORT);
    server.listen({ port }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}

main().catch(console.error);

export function add(a: number, b: number) {
    return a + b;
}
