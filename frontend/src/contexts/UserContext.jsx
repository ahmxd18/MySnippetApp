import { createContext, useContext, React, useState } from "react"

const UserContext = createContext()
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// const UserContext = () => {
//   return <div>UserContext</div>
// }

export { UserContext, UserContextProvider }
