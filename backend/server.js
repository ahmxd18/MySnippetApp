import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import snippetRouter from "./routes/snippetRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use("/auth", authRouter)
app.use("/", snippetRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
