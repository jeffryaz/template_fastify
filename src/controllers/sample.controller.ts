import { FastifyReply, FastifyRequest } from "fastify";
import Data from "../models/Data";
import { knexConnection } from "../config/knex";
import { errorRespons, requestClosedRespont, resultRespont } from "../util/handlerRespons";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const sample = async (request: FastifyRequest, reply: FastifyReply): Promise<any> => {
    try {
        const product: any[] = await knexConnection.select()
            .from('products');
        const item: any[] = await Data.find({});
        const data = {
            code: 200,
            data: {
                product,
                item
            }
        }
        // JSON.parse('hjjhb')
        await delay(5000)
        requestClosedRespont(request, reply);
        return resultRespont(reply, data);
    } catch (error: any) {
        return errorRespons(reply, error);
    }
}