"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const variabel_1 = require("../constant/variabel");
const ENV_IP = process.env.ENV_IP ?? 'DEV';
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(variabel_1.MONGOOSE_CONNECTION_STRING[ENV_IP]);
exports.mongodb = mongoose_1.default;
