import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js"
import usersRouter from "./routes/user.route.js"
import connectToMongoDB from "./db/mongoDbConnection.js"
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"]
}));

app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send("congrats!!");
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server listening at http://localhost:${PORT}`);
})