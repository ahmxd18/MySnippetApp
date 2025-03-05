import express from "express"
import {
  signupUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  authenticate,
  getLikedByUsers,
} from "../controllers/authController.js"

const router = express.Router()
router.post("/signup", signupUser)
router.post("/login", loginUser)
router.get("/users/:userID", getUser)
router.post("/logout", logoutUser)
router.post("/update", updateUser)
router.get("/getLikedByUsers", getLikedByUsers)

router.get("/authenticate", authenticate)
export default router
