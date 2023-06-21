import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import routerSample from './sample/index';
import { PORT } from '../constant/variabel';
const ENV_IP: any = process.env.ENV_IP;
let socket: any = null;


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

const subscribe = (socket: any): void => {
    socket.on("hello", (arg: any) => {
        console.log(arg); // world
    });
}

const router = {
    async init(f: FastifyInstance): Promise<void> {
        f.register(swagger, {
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
                host: 'localhost:' + PORT,
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
            f.register(swaggerUi, {
                routePrefix: '/documentation',
                uiConfig: {
                    docExpansion: 'none',
                    deepLinking: false
                },
                uiHooks: {
                    onRequest: function (request, reply, next) { next() },
                    preHandler: function (request, reply, next) { next() }
                },
                staticCSP: true,
                transformStaticCSP: (header) => header,
                transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
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
        f.register(routerSample, { prefix: 'api/v1' });
        // f.register(routerSocket, { prefix: 'api/v1/socket' });
        // app.use(error);
        await f.ready(err => {
            if (err) throw err;
            f.io.on('connection', (sockets: any) => {
                socket = sockets;
                console.info('Socket connected!', socket.id)
                // console.info('socket', socket);
                console.info('socket.rooms', socket.rooms)
                console.log("initial transport", socket.conn.transport.name); // prints "polling"
                subscribe(socket);

                socket.conn.once("upgrade", () => {
                    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
                    console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
                });

                socket.conn.on("packet", ({ type, data }: any) => {
                    // called for each packet received
                });

                socket.conn.on("packetCreate", ({ type, data }: any) => {
                    // called for each packet sent
                });

                socket.conn.on("drain", () => {
                    // called when the write buffer is drained
                });

                socket.conn.on("close", (reason: any) => {
                    // called when the underlying connection is closed
                    console.log('reason', reason);

                });
            })
        });
    },
};

export { router, socket };