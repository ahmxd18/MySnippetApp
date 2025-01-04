import User from "../models/User.js"

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body

    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Creating a new user
    const newUser = new User({
      name,
      email,
      username,
      password,
    })
    await newUser.save()
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }
}

export default signupUser