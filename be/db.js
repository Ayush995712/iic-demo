import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    username: {type: String,required: true},
    email: {type: String,required: true, unique: true},
    password: {type: String, required: true}
}, { timestamps: true })

export const userModel = mongoose.model('Users', user);