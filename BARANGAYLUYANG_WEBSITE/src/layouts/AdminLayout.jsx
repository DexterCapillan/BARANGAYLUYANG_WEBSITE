import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar.jsx";

export default function AdminLayout() {
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
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </main>
    </div>
  );
}