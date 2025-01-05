import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Profile from "./pages/Profile"
import Snippets from "./pages/Snippets"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { UserContextProvider } from "./contexts/UserContext"
import Toast from "./components/Toast"

const App = () => {
  return (
    <UserContextProvider>
      <Toast />
      <Router>
        <Navbar />
        <div className="min-h-screen bg-secondary p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="*"
              element={
                <h1 className="text-7xl text-center mt-20 text-text">
                  404 - Page Not Found
                </h1>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  )
}

export default App
