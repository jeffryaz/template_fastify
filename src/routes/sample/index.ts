import { FastifyInstance } from "fastify";
import { sample } from "../../controllers";

const routerSample = (fastify: FastifyInstance, opts: any, done: any) => {
    fastify.get('/', sample);
    done();
}


export default routerSample;