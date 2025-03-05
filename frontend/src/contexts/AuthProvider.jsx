import { React, useState, createContext, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/authenticate", {
          withCredentials: true,
        })
        if (res.data.success) setUser(res.data.user)
      } catch (err) {
        console.error("Auth check failed", err)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
