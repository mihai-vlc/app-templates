import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { Resource } from "fastify-autoroutes";

interface IQuerystring {
    name: string;
}

export default (fastify: FastifyInstance) => {
    async function get(
        request: FastifyRequest<{
            Querystring: IQuerystring;
        }>,
        reply: FastifyReply
    ) {
        const name = request.query.name || "John Doe";

        if (name == "John Doe") {
            request.log.warn(
                { url: request.raw.url, id: request.id },
                "Page was accessed by john doe"
            );
        }

        return {
            message: `Hello ${name}`,
            number: Math.random(),
        };
    }

    return <Resource>{
        get: { handler: get },
    };
};
