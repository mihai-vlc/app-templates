import fastify, { FastifyInstance } from "fastify";
import autoroutes from "fastify-autoroutes";
import path from "path";
import fs from "fs/promises";
import pino from "pino";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";

async function main() {
    require("dotenv").config();

    const server = fastify({
        logger: {
            level: "info",
            stream: pino.multistream([
                { stream: pino.destination() },
                { stream: pino.destination(path.join(__dirname, "app.log")) },
            ]),
        },
        disableRequestLogging: true,
    });

    if (process.env.NODE_ENV == "production") {
        await initializeStaticRoutes(server);
    } else {
        await initializeViteServer(server);
    }

    await server.register(autoroutes, {
        dir: path.resolve("./controllers"),
    });

    const port = Number(process.env.PORT) || 8000;
    server.listen({ port, host: "0.0.0.0" }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(`Server listening at ${address}`);
    });
}

async function initializeStaticRoutes(server: FastifyInstance) {
    server.register(fastifyStatic, {
        root: path.join(__dirname, "ui"),
        prefix: "/ui/",
    });

    server.get("*", async function (request, reply) {
        let template = await fs.readFile(
            path.join(__dirname, "ui", "index.html"),
            "utf-8"
        );

        reply.type("text/html");
        reply.send(template);
    });
}

async function initializeViteServer(server: FastifyInstance) {
    const vite = await import("vite");
    await server.register(fastifyMiddie);

    const viteServer = await vite.createServer({
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
