import { expect, test, beforeAll } from "vitest";
import page from "./hello";
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
    expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
    );

    var data = JSON.parse(response.payload);

    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("number");
    expect(data.message).toContain("Mihai");
});
