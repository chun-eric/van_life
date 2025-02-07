import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  // tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // on first mount check local storage
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedin");
    const userData = localStorage.getItem("user");
    if (loggedIn && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("loggedin");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // login function
  const login = async (credentials) => {
    try {
      // First, check if we have the required credentials
      if (!credentials?.email) {
        throw new Error("Email is required");
      }

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      let data = null;

      try {
        // Only try to parse response if status is not 500
        if (res.status !== 500) {
          const rawText = await res.text();
          data = rawText ? JSON.parse(rawText) : null;
        }
      } catch (error) {
        console.error("Failed to parse response:", error);
      }

      // Handle different response scenarios
      if (res.status === 500) {
        throw new Error("Server error occurred. Please try again later.");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      if (!data) {
        throw new Error("No data received from server");
      }

      // At this point, we have valid data
      localStorage.setItem("loggedin", "true");
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLoggedIn(true);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw {
        message: error.message || "Login failed",
        statusText: error.statusText || "Error",
        status: error.status || 500,
      };
    }
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    // makes our state and functions accessible to all our children
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
