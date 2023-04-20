"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../config/mongoose");
const Schema = mongoose_1.mongodb.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    lastName: String,
    public: {
        type: Boolean,
    },
    age: Number
}, { collection: 'data' });
exports.default = mongoose_1.mongodb.model('data', UserSchema);
