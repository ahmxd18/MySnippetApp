import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { successToast, errorToast, infoToast } from "../utils/toast"

const Signup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const isPasswordValid = (password) => {
    const REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%._]).{8,}$/
    return REGEX.test(password)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      errorToast("All Fields are required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      errorToast("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      errorToast("Minimum 8 characters are required")
      return
    }

    if (!isPasswordValid(formData.password)) {
      errorToast("Password doesn't meet the requirements")
      return
    }
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })

      if (response.status === 201) {
        successToast("Account Created Successfully")
        navigate("/login")
      } else {
        errorToast("Something went wrong")
      }
    } catch (error) {
      if (error.response) {
        errorToast(`Error: ${error.response.data.message}`)
      } else if (error.request) {
        errorToast(`No response from server`)
      } else {
        errorToast(`Error ${error.message}`)
      }
    }
  }

  const handleLoginPress = () => {
    setFormData({})
    navigate("/login")
  }

  return (
    <div className="flex justify-center items-center max-h-screen bg-secondary pt-10">
      <div className="bg-white px-6 py-2 rounded-lg shadow-lg w-[28rem] max-h-[70%] overflow-y-auto mt-4">
        <h2 className="text-2xl font-heading text-gray-800 mb-3 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-text font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="username" className="block text-text font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-text font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-text font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-text font-medium"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center p-4 gap-4">
          <h3>Already have an account?</h3>
          <button
            className="px-10 py-2 bg-border text-text rounded-lg font-semibold"
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
