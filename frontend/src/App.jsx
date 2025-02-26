import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Profile from "./pages/Profile"
import Snippets from "./pages/Snippets"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
// import Toast from "./components/Toast"
import { ModalProvider } from "./contexts/ModalProvider"
import { AuthProvider } from "./contexts/AuthProvider"
import { useAuth } from "./contexts/AuthProvider"
const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Router>
            {/* <Toast /> */}
            <div className="flex flex-col">
              <Navbar />
              <div className="mt-14 bg-secondary ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/snippets" element={<Snippets />} />
                  <Route
                    path="/profile"
                    element={<Profile /> }
                  />
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
            </div>
          </Router>
        </ModalProvider>
      </AuthProvider>
    </>
  )
}

export default App
