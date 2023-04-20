import { mongodb } from "../config/mongoose";

const Schema = mongodb.Schema;
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

export default mongodb.model('data', UserSchema);