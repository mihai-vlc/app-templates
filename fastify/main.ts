import fastify, { FastifyInstance } from "fastify";
import autoroutes from "fastify-autoroutes";
import path from "path";
import fs from "fs/promises";
import pino from "pino";
import { createServer as createViteServer } from "vite";
import middie from "@fastify/middie";

async function main() {
    require("dotenv").config();

    const server = fastify({
        logger: {
            level: "info",
            stream: pino.multistream([
                { stream: pino.destination() },
                { stream: pino.destination("app.log") },
            ]),
        },
        disableRequestLogging: true,
    });

    await initializeVite(server);

    await server.register(autoroutes, {
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

async function initializeVite(server: FastifyInstance) {
    await server.register(middie);

    const viteServer = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
        root: path.join(__dirname, "ui"),
    });

    server.use(viteServer.middlewares);

    server.route({
        method: "GET",
        url: "/",
        handler: async function (request, reply) {
            let template = await fs.readFile(
                path.join(__dirname, "ui", "index.html"),
                "utf-8"
            );

            // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react
            template = await viteServer.transformIndexHtml("/", template);

            reply.type("text/html");
            reply.send(template);
        },
    });
}

if (module === require.main) {
    main().catch(console.error);
}
