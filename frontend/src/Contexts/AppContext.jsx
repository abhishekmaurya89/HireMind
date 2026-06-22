import { createContext, useContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const backendUrl = import.meta.env.VITE_API_URL;
  const value = {
    user,
    setUser,
    token,
    setToken,
    backendUrl,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
