"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
const routerSample = (fastify, opts, done) => {
    fastify.get('/', controllers_1.sample);
    done();
};
exports.default = routerSample;
