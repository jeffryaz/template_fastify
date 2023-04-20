import { FastifyReply, FastifyRequest } from "fastify";
import { generateIdErrorMessage } from "./generateId";


/* eslint-disable no-useless-escape */
export const onSend = async (req: FastifyRequest, reply: FastifyReply, payload: any): Promise<void> => {
    const contentLog: any = {
        ip: req.ip,
        protocol: req.protocol,
        path: req.raw.url,
        method: req.raw.method,
        params: req.params,
        query: req.query,
        body: req.body || 'null',
        header: req.headers,
        statusCode: reply.raw.statusCode,
        statusMessage: reply.raw.statusMessage || 'OK',
        stack: null
    }
    const newPayload: any = {
        meta: {
            statusCode: reply.raw.statusCode,
            statusMessage: 'OK',
            errorId: null
        },
        data: null
    }
    const url: any = req.raw.url;
    if (url.split('/')[1] === 'documentation') {
        return payload;
    } else {
        let payloadData: any = null;
        const isJson: boolean = /^[\],:{}\s]*$/.test(payload.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
        if (payload && isJson) {
            payloadData = JSON.parse(payload);
        } else {
            payloadData = payload;
        }
        if (reply.raw.statusCode < 300) {
            newPayload.data = payloadData;
            delete contentLog.header;
            delete contentLog.params;
            delete contentLog.query;
            delete contentLog.body;
            delete contentLog.header;
            delete contentLog.stack;
            reply.log.info({ contentLog }, 'Request Completed');
            const data = isJson ? JSON.stringify(newPayload) : payloadData;
            return data;
        } else {
            if (payloadData?.error && !(payloadData?.message.includes('Route') && payloadData?.message.includes('not found'))) {
                newPayload.meta.errorId = generateIdErrorMessage(8);
                newPayload.meta.statusMessage = 'Oops, something bad happens.';
                contentLog.errorId = newPayload.meta.errorId;
                contentLog.statusMessage = payloadData.message;
                contentLog.stack = payloadData.stack || null;
            } else {
                newPayload.meta.statusMessage = payloadData.message || 'An error occurred in the data';
                contentLog.statusMessage = payloadData.message || 'An error occurred in the data';
                contentLog.stack = payloadData.stack || null;
            }
            reply.log.error({ contentLog }, 'Parsed Error');
            const data = isJson ? JSON.stringify(newPayload) : payloadData;
            return data;
        }
    }
}

export const onResponse = (req: FastifyRequest, reply: FastifyReply, done: any): void => {
    reply.header('X-Frame-Options', 'SAMEORIGIN');
    done();
}
