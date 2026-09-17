import { createContext, useContext, useState } from "react";
import MySnackbar from "../components/MySnackbar";

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [showHideBar, setShowHideBar] = useState(false);
  const [msg, setMsg] = useState("");
  function handleShowHideBar(msg) {
    setShowHideBar(true);
    setTimeout(() => {
      setShowHideBar(false);
    }, 2000);
    setMsg(msg);
  }
  return (
    <SnackbarContext.Provider value={{ handleShowHideBar }}>
      <MySnackbar showHideBar={showHideBar} msg={msg} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnack = function () {
  return useContext(SnackbarContext);
};
