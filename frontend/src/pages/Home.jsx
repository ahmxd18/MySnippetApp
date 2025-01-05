import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { useState, useContext } from "react"
import Card from "../components/Card"

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleGetStarted = () => {
    navigate("/signup")
  }
  return (
    <div className="text-center py-16">
      {user?.name ? (
        <div>
          <h1 className="font-heading text-4xl font-bold text-text mb-4">
            Hi {user?.name}
          </h1>
          <p>{user?.username} </p>
        </div>
      ) : (
        <div>
          <h1 className="font-heading text-4xl font-bold text-text mb-4">
            Save & Manage Your Code Snippets Seamlessly
          </h1>
          <h3 className="text-lg text-text mb-6">
            An intuitive tool for developers to organize and share code snippets
            effortlessly.
          </h3>
          <button
            className="px-6 py-3 bg-border text-text font-medium rounded-md hover:bg-primary hover:text-text transition-all duration-300"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center md:justify-center gap-6 p-6">
        <Card title={"Save Codes"} description={"Save Codes efficiently "} />
        <Card
          title={"Manage Codes"}
          description={"Manage Codes effectively "}
        />
        <Card title={"Share Codes"} description={"Share Codes effortlessly "} />
      </div>
    </div>
  )
}

export default Home
