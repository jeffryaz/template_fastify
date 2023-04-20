import mongoose from 'mongoose';
import { MONGOOSE_CONNECTION_STRING } from '../constant/variabel';

const ENV_IP: string = process.env.ENV_IP ?? 'DEV';
mongoose.set('strictQuery', true);
mongoose.connect(MONGOOSE_CONNECTION_STRING[ENV_IP]);
export const mongodb = mongoose;
