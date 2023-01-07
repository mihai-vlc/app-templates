import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { Resource } from "fastify-autoroutes";

interface IQuerystring {
    name: string;
}

async function get(
    request: FastifyRequest<{
        Querystring: IQuerystring;
    }>,
    reply: FastifyReply
) {
    return `Hello ${request.query.name} ${Math.random()}`;
}

export default (fastify: FastifyInstance) => {
    return <Resource>{
        get: { handler: get },
    };
};
