import React, { useState } from "react"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({
      username: "",
      password: "",
    })
    alert(
      `Login processing for ${formData.username} with passowrd: ${formData.password}`
    )
  }

  return (
    <div className="flex flex-col justify-center items-center bg-border p-8 rounded-lg">
      <div>
        <h2>Login to your account</h2>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
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
