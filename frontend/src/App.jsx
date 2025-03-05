import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Profile from "./pages/Profile"
import Snippets from "./pages/Snippets"
import SnippetDetails from "./pages/SnippetDetails"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AIChat from "./pages/AIChat"
import Social from "./pages/Social"
import Toast from "./components/Toast"
import { ModalProvider } from "./contexts/ModalProvider"
import { AuthProvider } from "./contexts/AuthProvider"
const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Router>
            <Toast />
            <div className="flex flex-col">
              <Navbar />
              {/* <div className="mt-20 bg-secondary "> */}
              <div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/snippets" element={<Snippets />} />
                  <Route path="/snippet/details" element={<SnippetDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/AIChat" element={<AIChat />} />
                  <Route path="/social" element={<Social />} />
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
              <Footer />
            </div>
          </Router>
        </ModalProvider>
      </AuthProvider>
    </>
  )
}

export default App
