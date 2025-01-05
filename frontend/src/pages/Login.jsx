import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { successToast } from "../utils/toast.js"

const Login = () => {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({ username: "", password: "" })
  const navigate = useNavigate()

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

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.password) {
      alert("All fields are required")
      return
    }

    if (formData.password.length < 8 || !isPasswordValid(formData.password)) {
      alert("Password specifications not met")
      return
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: formData.username,
        password: formData.password,
      })

      if (response.status === 200) {
        const userData = response.data.user
        setUser(userData)
        successToast("Login Successful")
        navigate("/profile")
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
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-border p-8 rounded-lg mt-16">
      <div>
        <h2>Login to your account</h2>
      </div>
      <div>
        <form
          onSubmit={handleLogin}
          className="p-2 flex flex-col justify-center items-center"
        >
          <div className="p-4 flex justify-center gap-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="rounded bg-secondary border-none"
            />
          </div>
          <div className="p-4 flex justify-center gap-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-primary pt-2 pb-2 pl-4 pr-4 rounded"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
