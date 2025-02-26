import { NavLink } from "react-router-dom"

const Navbar = () => {
  const activeClass =
    "text-primary font-medium hover:text-primary transition-colors duration-300 underline"
  const inactiveClass =
    "text-text font-medium hover:text-primary transition-colors duration-300"

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-border fixed top-0 left-0 right-0">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        Home
      </NavLink>
      <NavLink
        to="/snippets"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        Snippets
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        Profile
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        About Us
      </NavLink>
    </div>
  )
}

export default Navbar
