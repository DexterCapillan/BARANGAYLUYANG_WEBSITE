// src/components/common/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Megaphone, HeartPulse, Settings, ScrollText } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Residents", path: "/admin/residents", icon: Users },
    { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
    { name: "Health Services", path: "/admin/health", icon: HeartPulse },
    { name: "Legislation", path: "/admin/legislation", icon: ScrollText },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen border-r border-blue-800 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-8">Luyang Admin</h2>

      <nav className="space-y-2">
        {links.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-white text-blue-900 shadow-sm"
                  : "hover:bg-blue-800"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}