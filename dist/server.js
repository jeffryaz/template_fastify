"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const websocket_1 = __importDefault(require("@fastify/websocket"));
const router_1 = __importDefault(require("./src/routes/router"));
const variabel_1 = require("./src/constant/variabel");
const handlerAddHook_1 = require("./src/util/handlerAddHook");
const mongoose_1 = require("./src/config/mongoose");
const f = (0, fastify_1.default)({ logger: process.env.ENV_IP === 'PROD' ? false : true });
// const ENV_IP: any = process.env.ENV_IP;
f.register(multipart_1.default);
f.register(formbody_1.default);
f.register(websocket_1.default);
f.addHook('onSend', handlerAddHook_1.onSend);
router_1.default.init(f);
mongoose_1.mongodb.connection.on('open', () => {
    console.log('MongoDb OK');
});
mongoose_1.mongodb.connection.on('error', (err) => {
    console.log('Connection Failed', err);
});
f.listen({ port: variabel_1.PORT }, (err, address) => {
    if (err) {
        f.log.error(err);
        process.exit(1);
    }
    f.log.info(`Server NodeJs Fastify ORM KnexJs with Postgresql AND MongoDB is running on ${address}`);
});
