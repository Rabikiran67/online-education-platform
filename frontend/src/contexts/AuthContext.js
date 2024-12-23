import React, { createContext, useContext, useState, useEffect } from "react";
import { signup, login, getCurrentUser, logout, googleLogin } from "../services/authService"; // Add googleLogin import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser(); // Fetch current user
      setUser(currentUser);
    } catch (error) {
      setUser(null); // If error, set user to null
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSignup = async (name, email, password) => {
    try {
      const userData = await signup(name, email, password);
      setUser(userData);
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed. Please try again.");
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async (token) => {
    try {
      const userData = await googleLogin(token); // Handle Google login
      setUser(userData);
    } catch (error) {
      console.error("Google login error:", error);
      throw new Error("Google login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignup, handleLogout, handleGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
