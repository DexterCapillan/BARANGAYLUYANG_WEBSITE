// src/App.jsx // v2
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { AnnouncementsProvider } from "./context/AnnouncementsContext";
import { AuthProvider } from "./context/authContext";
import { HealthProvider } from "./context/HealthContext";
import { ResidentsProvider } from "./context/ResidentsContext";
import { LegislationProvider } from "./context/LegislationContext";
import { GalleryProvider } from "./context/GalleryContext";
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
import ExecutiveOrders from "./pages/public/ExecutiveOrders";
import Ordinances from "./pages/public/Ordinances";
import Resolutions from "./pages/public/Resolutions";
import CitizensCharter from "./pages/public/CitizensCharter";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import AdminAnnouncements from "./pages/admin/Announcements";
import HealthServices from "./pages/admin/HealthServices";
import ResidentsPage from "./features/residents/residentsPage";
import Legislation from "./pages/admin/Legislation";
import AdminGallery from "./pages/admin/Gallery";

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
          <LegislationProvider>
            <GalleryProvider>
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
                    <Route path="/citizens-charter" element={<CitizensCharter />} />
                    <Route path="/services/announcements" element={<PublicAnnouncements />} />
                    <Route path="/services/residents" element={<PublicResidents />} />
                    <Route path="/services/executive-orders" element={<ExecutiveOrders />} />
                    <Route path="/services/ordinances" element={<Ordinances />} />
                    <Route path="/services/resolutions" element={<Resolutions />} />
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
                    <Route path="legislation" element={<Legislation />} />
                    <Route path="gallery" element={<AdminGallery />} />
                  </Route>

                </Routes>
              </BrowserRouter>
            </GalleryProvider>
          </LegislationProvider>
        </HealthProvider>
      </AnnouncementsProvider>
    </AuthProvider>
  );
}
