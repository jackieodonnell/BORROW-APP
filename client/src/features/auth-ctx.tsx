import React, { createContext, useState, useContext } from "react";
import { UiCtx } from "./ui-ctx";
import { UserCtx } from "./user-ctx";
import axios from "axios";
import { storeToken, clearLocalStorage } from "../utils/token";
import { inputData } from "../models/auth";

const inputDataTemplate = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

interface ctxType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggin: boolean;
  setIsLoggin: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: inputData;
  setInputData: React.Dispatch<React.SetStateAction<inputData>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitAuth: (e: React.FormEvent<HTMLImageElement>) => void;
  onLogout: () => void;
  isTokenExp: () => void;
  serverErr: boolean;
  setServerErr: React.Dispatch<React.SetStateAction<boolean>>;
  errMsg: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
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
  onLogout: () => {},
  isTokenExp: () => {},
  serverErr: true,
  setServerErr: () => {},
  errMsg: "",
  setErrMsg: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const uiMgr = useContext(UiCtx);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);
  const [inputData, setInputData] = useState<inputData>(inputDataTemplate);
  const [serverErr, setServerErr] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerErr(false);
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onClearInputData = () => setInputData(inputDataTemplate);

  const onSubmitAuth = async (e: React.FormEvent<HTMLImageElement>) => {
    e.preventDefault();
    uiMgr.dispatch({ type: "LOADING" });
    let url = isLoggin ? "/api/v1/login" : "/api/v1/register";
    await axios
      .post(url, inputData)
      .then((serverRes) => {
        serverRes.data.loans.reverse();
        userMgr.setCurrentUser(serverRes.data);
        uiMgr.dispatch({ type: "DASHBOARD" });
        setIsAuth(true);
        storeToken(serverRes);
        onClearInputData();
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "AUTH" });
        setServerErr(true);
        setErrMsg(err.response.data.message);
      });
  };

  const isTokenExp = async () => {
    const storedData = localStorage.getItem("userValidation");

    if (typeof storedData === "string") {
      const parse = JSON.parse(storedData);

      if (parse && new Date(parse.expiration) > new Date()) {
        uiMgr.dispatch({ type: "LOADING" });

        await axios
          .get(`/api/v1/${parse.username}/validate`, {
            headers: { authorization: parse.token },
          })
          .then((serverRes) => {
            userMgr.setCurrentUser({
              user: serverRes.data.user,
              reputation: parse.reputation,
              token: parse.token,
              loans: serverRes.data.loans,
            });
            setIsAuth(true);
            return uiMgr.dispatch({ type: "DASHBOARD" });
          })
          .catch((err) => {
            uiMgr.dispatch({ type: "CLOSE" });
            return setIsAuth(false);
          });
      }
    }
  };

  const onLogout = () => {
    userMgr.clearCurrentUser();
    uiMgr.dispatch({ type: "CLOSE" });
    setIsAuth(false);
    clearLocalStorage();
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
        onLogout,
        isTokenExp,
        serverErr,
        setServerErr,
        errMsg,
        setErrMsg,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
