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
    if (loggedIn) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // login function
  const login = async (credentials) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status,
      };
    }

    localStorage.setItem("loggedin", true);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setIsLoggedIn(true);

    return data;
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
