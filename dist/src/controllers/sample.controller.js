"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const knex_1 = require("../config/knex");
const handlerRespons_1 = require("../util/handlerRespons");
const sample = async (request, reply) => {
    try {
        const product = await knex_1.knexConnection.select()
            .from('products');
        const item = await Data_1.default.find({});
        const data = {
            code: 200,
            data: {
                product,
                item
            }
        };
        request.raw.on('close', () => {
            if (request.raw.aborted) {
                console.log('cancel');
            }
        });
        // return resultRespont(reply, data);
    }
    catch (error) {
        return (0, handlerRespons_1.errorRespons)(reply, error);
    }
};
exports.sample = sample;
