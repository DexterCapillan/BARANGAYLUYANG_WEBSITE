// src/router.jsx
import { createBrowserRouter } from "react-router-dom";

// 1. ADD THIS IMPORT
import PublicLayout from "./layouts/PublicLayout";

// 2. Ensure all other components used below are also imported
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Officials from "./pages/public/Officials";
import Contact from "./pages/public/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, // This was causing the error
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "officials", element: <Officials /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
