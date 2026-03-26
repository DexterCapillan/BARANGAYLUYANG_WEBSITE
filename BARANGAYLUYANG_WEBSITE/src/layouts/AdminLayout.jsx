// src/layouts/AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

export default function AdminLayout() {
  // For demo; replace with real logout handler and route
  const handleLogout = () => {
    // e.g., clear token, redirect to login
    console.log("Logged out");
    // If using react-router v6.4+, you can use:
    // navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shadow-sm">
          <span className="font-semibold text-slate-700 tracking-wide">
            Barangay Admin Panel
          </span>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Admin</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
              A
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-150"
            >
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6 bg-slate-50 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}