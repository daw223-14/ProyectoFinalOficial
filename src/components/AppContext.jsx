import React, { createContext, useState, useMemo, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token") || "";
  const initialCarritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [token, setToken] = useState(initialToken);
  const [carritoItems, setCarritoItems] = useState(initialCarritoItems);

  useEffect(() => {
    localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
  }, [carritoItems]);

  const handleLogout = () => {
    setIsUserLogged(false);
    setToken("");
    localStorage.removeItem("token");
  };

  const handleLoginToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
    setIsUserLogged(true);
  };

  const appContextValue = useMemo(() => ({
    isUserLogged,
    setIsUserLogged,
    token,
    handleLogout,
    handleLoginToken,
    carritoItems,
    setCarritoItems
  }), [isUserLogged, token, carritoItems]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider};