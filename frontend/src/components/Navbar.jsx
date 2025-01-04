import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-border">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-medium hover:text-primary transition-colors duration-300 underline"
            : "text-text font-medium hover:text-primary transition-colors duration-300"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/snippets"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-medium hover:text-primary transition-colors duration-300 underline"
            : "text-text font-medium hover:text-primary transition-colors duration-300"
        }
      >
        Snippets
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-medium hover:text-primary transition-colors duration-300 underline"
            : "text-text font-medium hover:text-primary transition-colors duration-300"
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-medium hover:text-primary transition-colors duration-300 underline"
            : "text-text font-medium hover:text-primary transition-colors duration-300"
        }
      >
        About Us
      </NavLink>
    </div>
  )
}

export default Navbar
