import mongoose from "mongoose";

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