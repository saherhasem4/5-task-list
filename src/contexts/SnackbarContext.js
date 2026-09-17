import { createContext, useState } from "react";
import MySnackbar from "../components/MySnackbar";

export const SnackbarContext = createContext({});

export const SnackbarProvider = ({ Children }) => {
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
      {Children}
    </SnackbarContext.Provider>
  );
};
