import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signupUser = async (req, res) => {
  const { name, username, email, password } = req.body

  if (!name || !email || !username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" })
  }
  try {
    const userExists = await User.findOne({ username })
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    // Creating a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser._id,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" })
  }
  try {
    const userExists = await User.findOne({ username })
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" })
    }
    const isMatched = await bcrypt.compare(password, userExists.password)
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" })
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res
      .status(200)
      .json({ success: true, message: "User Logged In", user: userExists._id })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const authenticate = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(400).json({ success: false, message: "Not logged in" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Invalid Token" })
    }
    res.status(200).json({ success: true, user: decoded.id })
  })
}

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    return res.status(200).json({ success: true, message: "User Logged out" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
