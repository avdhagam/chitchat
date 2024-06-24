import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js"
import connectToMongoDB from "./db/mongoDbConnection.js"


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send("congrats!!");
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server listening at http://localhost:5000`);
})
