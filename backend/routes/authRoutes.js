import express from "express"
import {
  signupUser,
  loginUser,
  logoutUser,
  authenticate,
} from "../controllers/authController.js"

const router = express.Router()
router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/authenticate", authenticate)
export default router
