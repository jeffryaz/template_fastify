"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSend = void 0;
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const graceful_fs_1 = __importDefault(require("graceful-fs"));
const generateId_1 = require("./generateId");
graceful_fs_1.default.gracefulify(fs_1.default);
/* eslint-disable no-useless-escape */
const onSend = async (req, reply, payload) => {
    const contentLog = {
        date: (0, moment_1.default)().utc().format('DD-MMM-YYYY HH:mm:ss'),
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
    };
    const newPayload = {
        meta: {
            statusCode: reply.raw.statusCode,
            statusMessage: 'OK',
            errorId: null
        },
        data: null
    };
    const url = req.raw.url;
    if (url.split('/')[1] === 'documentation') {
        return payload;
    }
    else {
        let payloadData = null;
        const isJson = /^[\],:{}\s]*$/.test(payload.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
        if (payload && isJson) {
            payloadData = JSON.parse(payload);
        }
        else {
            payloadData = payload;
        }
        if (reply.raw.statusCode < 300) {
            newPayload.data = payloadData;
            const data = isJson ? JSON.stringify(newPayload) : payloadData;
            return data;
        }
        else {
            if (payloadData?.error && !(payloadData?.message.includes('Route') && payloadData?.message.includes('not found'))) {
                newPayload.meta.errorId = (0, generateId_1.generateIdErrorMessage)(8);
                newPayload.meta.statusMessage = 'Oops, something bad happens.';
                contentLog.errorId = newPayload.meta.errorId;
                contentLog.statusMessage = payloadData.message;
                contentLog.stack = payloadData.stack || null;
            }
            else {
                newPayload.meta.statusMessage = payloadData.message || 'An error occurred in the data';
                contentLog.statusMessage = payloadData.message || 'An error occurred in the data';
                contentLog.stack = payloadData.stack || null;
            }
            const stream = graceful_fs_1.default.createWriteStream(`log/${(0, moment_1.default)().format('DD-MM-YYYY')}.log`, { 'flags': 'a' });
            stream.once('open', () => {
                stream.write(JSON.stringify(contentLog, null, "\t") + "\r\n");
            });
            const data = isJson ? JSON.stringify(newPayload) : payloadData;
            return data;
        }
    }
};
exports.onSend = onSend;
