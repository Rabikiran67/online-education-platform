import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase"; // Import the Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Subscribe to the user's auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user if authenticated
      setLoading(false); // Set loading to false after auth state is determined
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
