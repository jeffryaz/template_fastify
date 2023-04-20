import fastify, { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import formbody from '@fastify/formbody';
import websocket from '@fastify/websocket';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import moment from 'moment';


import router from './src/routes/router';
import { PORT } from './src/constant/variabel';
import { onSend, onResponse } from './src/util/handlerAddHook';
import { mongodb } from './src/config/mongoose';
import fastifyPlugin from './src/fastifyPlugin';

const f: FastifyInstance = fastify(
    {
        logger: {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: false,
                    colorizeObjects: true,
                    destination: `./log/${moment().format('DD-MM-YYYY')}.log`,
                    sync: false, // by default we write asynchronously
                    append: true, // the file is opened with the 'a' flag
                    mkdir: true, // create the target destination
                    translateTime: 'UTC:yyyy-mm-dd HH:MM:ss o',
                }
            },
        },
        disableRequestLogging: true,
        connectionTimeout: 30000 // 30 detik ideal pada sisi server
    }
);

// const ENV_IP: any = process.env.ENV_IP;
f.register(fastifyPlugin);
f.register(multipart);
f.register(formbody);
f.register(websocket);
f.register(cors, {});
f.register(compress, { global: true });

f.addHook('onSend', onSend);
f.addHook('onResponse', onResponse);

router.init(f);

mongodb.connection.on('open', () => {
    console.log('MongoDb OK');
})
mongodb.connection.on('error', (err) => {
    console.log('Connection Failed', err);
})

f.listen({ port: PORT }, (err, address) => {
    if (err) {
        f.log.error(err);
        process.exit(1);
    }
    f.log.info(`Server NodeJs Fastify ORM KnexJs with Postgresql AND MongoDB is running on ${address}`);
});