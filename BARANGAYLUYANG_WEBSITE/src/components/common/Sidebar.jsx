// src/components/common/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Residents", path: "/admin/residents" },
    { name: "Certificates", path: "/admin/certificates" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen border-r border-blue-800 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-8">Luyang Admin</h2>

      <nav className="space-y-2">
        {links.map(({ name, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-white text-blue-900 shadow-sm"
                  : "hover:bg-blue-800"
              }`}
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}