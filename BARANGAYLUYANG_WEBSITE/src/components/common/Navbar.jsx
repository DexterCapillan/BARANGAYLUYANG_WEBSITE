// src/components/common/Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-8 py-4 flex items-center justify-between">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">Barangay Luyang</h1>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-1 rounded-full transition ${
              isActive ? "bg-pink-500" : "hover:text-yellow-300"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink to="/about" className="hover:text-yellow-300">
          About
        </NavLink>

        <NavLink to="/contact" className="hover:text-yellow-300">
          Contact
        </NavLink>

        <NavLink to="/officials" className="hover:text-yellow-300">
          Officials
        </NavLink>

        <NavLink to="/services" className="hover:text-yellow-300">
          Services
        </NavLink>
      </div>
    </nav>
  );
}
