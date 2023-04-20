import { FastifyReply, FastifyRequest } from "fastify";

interface dataRespons {
    code: number,
    data: any
}

export const errorRespons = async (reply: FastifyReply, error: any): Promise<any> => {
    const dataError = {
        error: "Internal Server Error",
        message: error.message,
        stack: error.stack
    }
    return reply.code(500).send(dataError)
}

export const resultRespont = async (reply: FastifyReply, data: dataRespons): Promise<any> => {

    return reply.code(data.code).send(data.data);
}

export const requestClosedRespont = async (request: FastifyRequest, reply: FastifyReply): Promise<any> => {

    return request.raw.on('close', () => {
        if (request.raw.aborted) {
            const error = {
                code: 400,
                data: {
                    message: 'request closed',
                    stack: null
                }
            }
            reply.log.error({ contentLog: error }, 'request closed');
            return resultRespont(reply, error);
        }
    })
}