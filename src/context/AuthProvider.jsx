import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  // tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // on first mount check local storage
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedin");
    // !! converts the string to a boolean - very nice trick
    loggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  // login function
  const login = () => {
    localStorage.setItem("loggedin", true);
    setIsLoggedIn(true);
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("loggedin");
    setIsLoggedIn(false);
  };

  return (
    // makes our state and functions accessible to all our children
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
