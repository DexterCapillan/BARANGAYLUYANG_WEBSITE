import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/officials", label: "Officials" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-blue-950/95 backdrop-blur-md shadow-lg shadow-blue-950/20 py-3"
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <span className="text-blue-950 font-black text-sm">BL</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">Barangay Luyang</p>
            <p className="text-blue-300 text-xs leading-none mt-0.5">Bayombong, Nueva Vizcaya</p>
          </div>
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-400 text-blue-950 shadow-md"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/admin"
            className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 text-white hover:bg-white hover:text-blue-950 transition-all duration-200"
          >
            Admin
          </NavLink>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-blue-950/98 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? "bg-yellow-400 text-blue-950" : "text-blue-100 hover:bg-white/10"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-white border border-white/20 hover:bg-white hover:text-blue-950 transition mt-2"
          >
            Admin
          </NavLink>
        </div>
      )}
    </nav>
  );
}