import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { UiCtx } from "./ui-ctx";
import { inputData } from "../models/auth";
import { UserCtx } from "./user-ctx";

interface ctxType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggin: boolean;
  setIsLoggin: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: inputData;
  setInputData: React.Dispatch<React.SetStateAction<inputData>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitAuth: (e: React.FormEvent<HTMLImageElement>) => void;
}

export const AuthCtx = createContext<ctxType>({
  isAuth: false,
  setIsAuth: () => {},
  isLoggin: false,
  setIsLoggin: () => {},
  inputData: { email: "", username: "", password: "", confirmPassword: "" },
  setInputData: () => {},
  onInputChange: () => {},
  onSubmitAuth: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const uiMgr = useContext(UiCtx);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);
  const [inputData, setInputData] = useState<inputData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmitAuth = async (e: React.FormEvent<HTMLImageElement>) => {
    e.preventDefault();
    let url = isLoggin ? "/api/v1/login" : "/api/v1/register";
    await axios
      .post(url, inputData)
      .then((serverRes) => {
        console.log(serverRes.data);
        userMgr.setCurrentUser(serverRes.data);
        console.log(userMgr.currentUser);
        uiMgr.dispatch({ type: "DASHBOARD" });
        setIsAuth(true);
        setInputData({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <AuthCtx.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoggin,
        setIsLoggin,
        inputData,
        setInputData,
        onInputChange,
        onSubmitAuth,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
