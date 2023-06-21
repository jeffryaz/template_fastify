
import { Telegraf } from 'telegraf';

export const PORT = 8080;
export const PG_CONNECTION_STRING: any = {
    DEV: process.env['PG_CONNECTION_STRING_DEV'],
    PROD: process.env['PG_CONNECTION_STRING_PROD']
}
export const MONGOOSE_CONNECTION_STRING: any = {
    DEV: process.env['MONGOOSE_CONNECTION_STRING_DEV'],
    PROD: process.env['MONGOOSE_CONNECTION_STRING_PROD']
}
export const botTelegram = new Telegraf(process.env['BOT_TOKEN'] || '');