import { expect, test, beforeAll } from "vitest";
import page from "./index";
import fastify, { FastifyInstance } from "fastify";

let server: FastifyInstance;

beforeAll(() => {
    server = fastify();

    const pageInstance = page(server);

    for (const [method, options] of Object.entries(pageInstance)) {
        server.route({
            method: method.toUpperCase(),
            url: "/",
            ...options,
        });
    }
});

test("shows a message on a get request", async function () {
    const response = await server.inject({
        method: "GET",
        url: "/",
        query: {
            name: "Mihai",
        },
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toContain("Hello Mihai");
});
