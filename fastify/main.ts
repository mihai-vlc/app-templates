import fastify from "fastify";
import autoroutes from "fastify-autoroutes";
import path from "path";

async function main() {
    require("dotenv").config();

    const server = fastify({ logger: true });

    server.register(autoroutes, {
        dir: path.resolve("./controllers"),
    });

    const port = Number(process.env.PORT) || 8000;
    server.listen({ port }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}

if (module === require.main) {
    main().catch(console.error);
}

export function add(a: number, b: number) {
    return a + b;
}
