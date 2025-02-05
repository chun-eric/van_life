import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// a custom hook to use the AuthContext outside of here

export const useAuth = () => useContext(AuthContext);
