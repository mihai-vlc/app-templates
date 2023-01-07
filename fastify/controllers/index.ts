import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { Resource } from "fastify-autoroutes";

export default (fastify: FastifyInstance) => {
    return <Resource>{
        get: {
            handler: async (request: FastifyRequest, reply: FastifyReply) => {
                return `Hello ${Math.random()}`;
            },
        },
    };
};
