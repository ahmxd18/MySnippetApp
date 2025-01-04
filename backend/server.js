import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import signupUser from "./controllers/authController.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

connectDB()

app.post("/api/signup", signupUser)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
