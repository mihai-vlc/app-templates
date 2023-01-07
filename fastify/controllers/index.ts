import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { Resource } from "fastify-autoroutes";

export default (fastify: FastifyInstance) => {
    async function get(request: FastifyRequest, reply: FastifyReply) {
        return ``;
    }

    return <Resource>{
        get: { handler: get },
    };
};
