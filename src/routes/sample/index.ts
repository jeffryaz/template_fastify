import { FastifyInstance } from "fastify";
import { Sample } from "../../controllers";

const routerSample = (fastify: FastifyInstance, opts: any, done: any) => {
    fastify.get('/', Sample);
    done();
}


export default routerSample;