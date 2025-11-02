import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { userModel } from "./db.js";

dotenv.config();
const admin_username = process.env.ADMIN_USERNAME;
const admin_password = process.env.ADMIN_PASSWORD;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/users", async (req, res) => {
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

app.post("/api/admin/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username == admin_username && password == admin_password) {
        return res.status(200).json({
            message: "Admin Signed in successfully"
        })
    }
    return res.status(401).json({
        message: "Invalid Credentials"
    })
})

app.get("/api/admin/users", async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(3000)