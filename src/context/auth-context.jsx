import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { Role } from "../consts/role";
import { getRole } from "../services/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);

    const role = getRole(token);

    setToken(token);

    if (role === Role.PRODAVAC) {
      navigate("/admin/korisnici");
    } else {
      navigate("/user/proizvodi");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
