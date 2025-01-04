import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

// Connect to local MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB successfully!")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message)
    process.exit(1) // Exit process with failure
  }
}

export default connectDB
