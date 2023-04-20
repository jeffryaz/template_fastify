"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultRespont = exports.errorRespons = void 0;
const errorRespons = async (reply, error) => {
    const dataError = {
        error: "Internal Server Error",
        message: error.message,
        stack: error.stack
    };
    return reply.code(500).send(dataError);
};
exports.errorRespons = errorRespons;
const resultRespont = async (reply, data) => {
    return reply.code(data.code).send(data.data);
};
exports.resultRespont = resultRespont;
