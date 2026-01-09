import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This is required to render Home.jsx content */}
    </div>
  );
}
