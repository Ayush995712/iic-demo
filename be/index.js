import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { userModel } from "./db";

dotenv.config();
const admin_username = process.env.ADMIN_USERNAME;
const admin_password = process.env.ADMIN_PASSWORD;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        await userModel.create({
            username, email, password
        })
        res.json({
            message: "Credentials submitted"
        })
    } catch(e) {
        res.status(400).json({
            message: "Error while submitting credentials"
        })
    }
})

app.post("/admin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username == admin_username && password == admin_password) {

    }
})

app.listen(3000)