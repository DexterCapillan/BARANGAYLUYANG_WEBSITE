import { createContext, useContext, useState } from "react";

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Export the AuthProvider as a NAMED export
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Export a custom hook for easier use
export function useAuth() {
  return useContext(AuthContext);
}
