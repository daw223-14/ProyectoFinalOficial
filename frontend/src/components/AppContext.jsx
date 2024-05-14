import React, { createContext, useState, useMemo, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token") || "";
  const initialCarritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];
  const initialListaDeseos = JSON.parse(localStorage.getItem("listaDeseos")) || [];

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [token, setToken] = useState(initialToken);
  const [carritoItems, setCarritoItems] = useState(initialCarritoItems);
  const [listaDeseos, setListaDeseos] = useState(JSON.parse(localStorage.getItem("listaDeseos")) || []);

  useEffect(() => {
    localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
  }, [carritoItems]);

  useEffect(() => {
    localStorage.setItem("listaDeseos", JSON.stringify(listaDeseos));
  }, [listaDeseos]);

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
    setCarritoItems,
    listaDeseos,
    setListaDeseos
  }), [isUserLogged, token, carritoItems, listaDeseos]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };