import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js"
import connectToMongoDB from "./db/mongoDbConnection.js"
import cors from "cors";


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send("congrats!!");
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server listening at http://localhost:${PORT}`);
})
