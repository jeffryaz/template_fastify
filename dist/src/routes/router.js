"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const index_1 = __importDefault(require("./sample/index"));
const variabel_1 = require("../constant/variabel");
const ENV_IP = process.env.ENV_IP;
// interface IQuery {
//     username: string;
//     password: string;
// }
// interface IReply {
//     code: number;
//     message: string;
//     body: any
// }
// interface IHeaders {
//     'x-access-token': string
// }
// f.get<{
//     // Querystring: IQuery,
//     Headers: IHeaders,
//     // Replay: IReply
// }>('/', async (request: any, reply: any) => {
//     await reply.send({ hello: 'word' })
// });
const router = {
    async init(f) {
        f.register(swagger_1.default, {
            swagger: {
                info: {
                    title: 'Swagger NodeJs Framework Fastify',
                    description: 'Ini adalah dokumentasi API untuk framework Fastify',
                    version: '0.1.0'
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Informasi lebih lanjut'
                },
                host: 'localhost:' + variabel_1.PORT,
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json'],
                tags: [
                    { name: 'user', description: 'User related end-points' },
                    { name: 'code', description: 'Code related end-points' }
                ],
                securityDefinitions: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'Bearer Token',
                        in: 'header'
                    }
                }
            }
        });
        if (ENV_IP === 'DEV') {
            f.register(swagger_ui_1.default, {
                routePrefix: '/documentation',
                uiConfig: {
                    docExpansion: 'none',
                    deepLinking: false
                },
                uiHooks: {
                    onRequest: function (request, reply, next) { next(); },
                    preHandler: function (request, reply, next) { next(); }
                },
                staticCSP: true,
                transformStaticCSP: (header) => header,
                transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
                transformSpecificationClone: true,
                // theme: {
                //     js: [
                //         { filename: '../swagger/swagger.js', content: '' }
                //     ],
                //     css: [],
                //     favicon: []
                // }
            });
        }
        f.register(index_1.default, { prefix: 'api/v1' });
        // app.use(error);
        await f.ready();
    },
};
exports.default = router;
