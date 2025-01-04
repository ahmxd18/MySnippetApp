import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle signup logic

    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required!")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords donot match")
      return
    }

    if (formData.password.length < 8) {
      alert("Minimum 8 characters are required")
      return
    }

    if (!isPasswordValid(formData.password)) {
      alert("Password doesn't meet the requirements")
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
        console.log("User created", formData)
        navigate("/login")
      } else {
        alert("Something went wrong")
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`)
      } else if (error.request) {
        alert(`No response from server`)
      } else {
        alert(`Error ${error.message}`)
      }
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center max-h-screen bg-secondary">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-[28rem] max-h-[70%] overflow-y-auto mt-4">
        <h2 className="text-2xl font-heading text-gray-800 mb-3 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-text font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-text font-medium mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-text font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-text font-medium mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-text font-medium mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
