import { React, useState, createContext, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/authenticate", {
          withCredentials: true,
        })
        if (res.data.success) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        setUser(null)
        console.error(err.message)
      }
    }
    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
