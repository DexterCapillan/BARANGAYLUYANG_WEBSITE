// src/router.jsx
import { createBrowserRouter } from "react-router-dom";

// PUBLIC
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Officials from "./pages/public/Officials";
import Contact from "./pages/public/Contact";

// ADMIN (NEW)
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ResidentsPage from "./features/residents/residentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "officials", element: <Officials /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "residents", element: <ResidentsPage /> }, // ← THIS WAS MISSING
    ],
  },
]);