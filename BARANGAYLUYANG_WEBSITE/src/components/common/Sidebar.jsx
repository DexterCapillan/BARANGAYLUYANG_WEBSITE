// src/components/common/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-8">Luyang Admin</h2>
      <nav className="space-y-4 flex flex-col">
        <Link to="/admin" className="hover:bg-blue-800 p-2 rounded">Dashboard</Link>
        <Link to="/admin/residents" className="hover:bg-blue-800 p-2 rounded">Residents</Link>
        <Link to="/admin/certificates" className="hover:bg-blue-800 p-2 rounded">Certificates</Link>
      </nav>
    </aside>
  );
}
