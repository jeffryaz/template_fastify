"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexConnection = void 0;
const knex_1 = __importDefault(require("knex"));
const variabel_1 = require("../constant/variabel");
const ENV_IP = process.env.ENV_IP ?? 'DEV';
exports.knexConnection = (0, knex_1.default)({
    client: 'pg',
    connection: variabel_1.PG_CONNECTION_STRING[ENV_IP],
    pool: { min: 0, max: 10 }
});
