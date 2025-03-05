import { NavLink } from "react-router-dom"

const Navbar = () => {
  const activeClass =
    "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium transition-all duration-300"
  const inactiveClass =
    "text-gray-300 font-medium hover:text-gray-100 transition-all duration-300 hover:scale-105"

  return (
    <nav className="flex justify-center gap-8 p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 fixed top-0 left-0 right-0 z-50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-300 animate-fade-in-down">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg hover:bg-gray-700/30 ${
            isActive ? activeClass : inactiveClass
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/snippets"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg hover:bg-gray-700/30 ${
            isActive ? activeClass : inactiveClass
          }`
        }
      >
        Snippets
      </NavLink>
      <NavLink
        to="/AIChat"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg hover:bg-gray-700/30 ${
            isActive ? activeClass : inactiveClass
          }`
        }
      >
        AIChat
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg hover:bg-gray-700/30 ${
            isActive ? activeClass : inactiveClass
          }`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/social"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg hover:bg-gray-700/30 ${
            isActive ? activeClass : inactiveClass
          }`
        }
      >
        Social
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg hover:bg-gray-700/30 ${
            isActive ? activeClass : inactiveClass
          }`
        }
      >
        About Us
      </NavLink>
    </nav>
  )
}

export default Navbar
