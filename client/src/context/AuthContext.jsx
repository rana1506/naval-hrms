import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      axios.get("/profile/me")
        .then(res => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (serviceNo, password) => {
    try {
      const res = await axios.post("/auth/login", { serviceNo, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      console.error("Auth login failed", {
        url: "/auth/login",
        baseURL: axios.defaults.baseURL,
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};