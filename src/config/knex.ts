import knex from 'knex';
import { PG_CONNECTION_STRING } from '../constant/variabel';

const ENV_IP: string = process.env.ENV_IP ?? 'DEV';
export const knexConnection = knex({
    client: 'pg',
    connection: PG_CONNECTION_STRING[ENV_IP],
    pool: { min: 0, max: 10 }
})