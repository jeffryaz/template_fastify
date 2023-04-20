export const PORT = 8080;
export const PG_CONNECTION_STRING: any = {
    DEV: 'postgresql://postgres:@Rosman1998@localhost:5432/example_data',
    PROD: 'postgresql://postgres:@Rosman1998@localhost:5432/example_data'
}
export const MONGOOSE_CONNECTION_STRING: any = {
    DEV: 'mongodb://127.0.0.1:27017/testing-local?readPreference=primary&ssl=false&directConnection=true&replicaSet=rs0',
    PROD: 'mongodb://127.0.0.1:27017/testing-local?readPreference=primary&ssl=false&directConnection=true&replicaSet=rs0'
}