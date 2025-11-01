import mongoose from 'mongoose';
import dotenv from "dotenv"

mongoose.connect("");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    user_id: ObjectId,
    username: {type: String, default: "Jon Doe", unique: true},
    email: {type: String, unique: true},
    password: {type: String},
})

export const userModel = mongoose.model('Users', user);