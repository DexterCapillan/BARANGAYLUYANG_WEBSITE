import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between">
          <span className="font-semibold text-slate-700">Admin Control Panel</span>
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
