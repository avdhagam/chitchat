import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }

    catch {
        console.log("error connecting to MongoDB")
    }

}

export default connectToMongoDB