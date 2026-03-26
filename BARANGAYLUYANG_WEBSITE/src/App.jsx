import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

// LAYOUTS
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// PUBLIC PAGES
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Officials from "./pages/public/Officials";
import Services from "./pages/public/Services";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import Announcements from "./pages/admin/Announcements"; // only this now

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* 🌐 PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/officials" element={<Officials />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* 🔐 ADMIN LOGIN */}
        <Route path="/admin/login" element={<Login />} />

        {/* 🛠 ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}