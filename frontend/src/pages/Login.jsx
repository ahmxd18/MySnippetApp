// const isPasswordValid = (password) => {
//   const REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%._]).{8,}$/
//   return REGEX.test(password)
// }

import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthProvider"
import { successToast, errorToast } from "../utils/toast.js"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { user, setUser } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        { withCredentials: true }
      )

      if (response.status === 200) {
        setUser(response.data.user)
        successToast("Login Successful")
        navigate("/")
      } else {
        setError(response.data.message)
        errorToast("Login Failed")
      }
    } catch (error) {
      console.error(error.message)
      errorToast("Something Crashed")
    }
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
            Login to Your Account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
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

          <div>
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

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-center items-center mt-6 gap-4">
          <h3 className="text-gray-300">Don't have an account?</h3>
          <button
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
