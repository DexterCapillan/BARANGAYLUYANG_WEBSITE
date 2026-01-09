// src/app/App.jsx
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { router } from "./router";


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
