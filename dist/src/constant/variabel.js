"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGOOSE_CONNECTION_STRING = exports.PG_CONNECTION_STRING = exports.PORT = void 0;
exports.PORT = 8080;
exports.PG_CONNECTION_STRING = {
    DEV: 'postgresql://postgres:@Rosman1998@localhost:5432/example_data',
    PROD: 'postgresql://postgres:@Rosman1998@localhost:5432/example_data'
};
exports.MONGOOSE_CONNECTION_STRING = {
    DEV: 'mongodb://127.0.0.1:27017/testing-local?readPreference=primary&ssl=false&directConnection=true&replicaSet=rs0',
    PROD: 'mongodb://127.0.0.1:27017/testing-local?readPreference=primary&ssl=false&directConnection=true&replicaSet=rs0'
};
