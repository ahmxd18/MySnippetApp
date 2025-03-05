// const isPasswordValid = (password) => {
//   const REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%._]).{8,}$/
//   return REGEX.test(password)
// }

import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"

const Signup = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      )
      if (!response.data.success) {
        setError(response.data.message)
      } else {
        setUser(response.data.user)
        navigate("/")
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    }
  }

  const handleLoginPress = () => {
    setFormData({})
    navigate("/login")
  }

  return (
    <div
      className="bg-gray-900 flex flex-col justify-center items-center p-6"
      style={{ minHeight: "calc(100vh - 4rem)" }} // Adjust for navbar height
    >
      <div className="bg-gray-800 px-8 py-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30"></div>
          <h2 className="text-3xl font-bold text-center relative z-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Create an Account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-300 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center mt-6 gap-4">
          <h3 className="text-gray-300">Already have an account?</h3>
          <button
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
            onClick={handleLoginPress}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
