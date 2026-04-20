// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { AnnouncementsProvider } from "./context/AnnouncementsContext";
import { AuthProvider } from "./context/AuthContext";
import { HealthProvider } from "./context/HealthContext";
import { ResidentsProvider } from "./context/ResidentsContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicResidents from "./pages/public/Residents";
import Settings from "./pages/admin/Settings";

// LAYOUTS
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// PUBLIC PAGES
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Officials from "./pages/public/Officials";
import Services from "./pages/public/Services";
import Health from "./pages/public/Health";
import PublicAnnouncements from "./pages/public/Announcements";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import AdminAnnouncements from "./pages/admin/Announcements";
import HealthServices from "./pages/admin/HealthServices";
import ResidentsPage from "./features/residents/ResidentsPage";

function AdminApp() {
  return (
    <ResidentsProvider>
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    </ResidentsProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AnnouncementsProvider>
        <HealthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>

              {/* PUBLIC */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/officials" element={<Officials />} />
                <Route path="/services" element={<Services />} />
                <Route path="/health" element={<Health />} />
                <Route path="/services/announcements" element={<PublicAnnouncements />} />
                <Route path="/services/residents" element={<PublicResidents />} />
              </Route>

              {/* ADMIN LOGIN */}
              <Route path="/admin/login" element={<Login />} />

              {/* ADMIN PANEL */}
              <Route path="/admin" element={<AdminApp />}>
                <Route index element={<Dashboard />} />
                <Route path="residents" element={<ResidentsPage />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="health" element={<HealthServices />} />
                <Route path="settings" element={<Settings />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </HealthProvider>
      </AnnouncementsProvider>
    </AuthProvider>
  );
}