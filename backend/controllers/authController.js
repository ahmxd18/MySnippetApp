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
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser._id,
    })
  } catch (error) {
    console.error(error)
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
      maxAge: 24 * 60 * 60 * 1000,
    })
    return res
      .status(200)
      .json({ success: true, message: "User Logged In", user: userExists._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const userID = req.params.userID
    const user = await User.findById(userID).select("-password")
    if (!user)
      return res.status(404).json({ success: false, message: "User Not Found" })
    res.status(200).json({ success: true, user })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server error" })
  }
}

export const authenticate = async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ success: false, message: "Not logged in" })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or Expired Token" })
      }
      const user = await User.findById(decoded.id).select("-password")
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" })

      res.status(200).json({ success: true, user: decoded.id })
    })
  } catch (error) {
    console.error("Authentication error:", error.message)
    res.status(500).json({ success: false, message: "Server error" })
  }
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

export const updateUser = async (req, res) => {
  const { name, currentPassword, newPassword, userID, profilePic } = req.body
  try {
    const user = await User.findById(userID)
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" })
    if (name) user.name = name
    if (profilePic) user.profilePic = profilePic
    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" })

      user.password = await bcrypt.hash(newPassword, 10)
    }
    await user.save()

    const userResponse = user.toObject()
    delete userResponse.password
    res.status(200).json({ success: true, user: userResponse })
  } catch (error) {
    console.error("Update error:", error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getLikedByUsers = async (req, res) => {
  try {
    const userIDs = req.query.userIDs.split(",")
    const users = await User.find(
      {
        _id: { $in: userIDs },
      },
      "name username profilePic"
    ).lean()

    if (!users)
      return res
        .status(404)
        .json({ success: false, message: "User(s) not found" })

    res.status(200).json({
      success: true,
      likedByUsers: users.map((user) => ({
        name: user.name,
        username: user.username,
        profilePic: user.profilePic,
      })),
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: "Server error" })
  }
}
