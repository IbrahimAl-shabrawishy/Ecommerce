import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function ContextUserProvider(props) {
  const [isLogin, setIsLogin] = useState(null);
  const [isRegister, setIsRegister] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setIsLogin(localStorage.getItem("userToken"));
      setIsRegister(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <userContext.Provider
      value={{ isLogin, setIsLogin, isRegister, setIsRegister }}
    >
      {props.children}
    </userContext.Provider>
  );
}
