import React, { useState, useContext, useEffect } from "react";
import { AuthCtx } from "./features/auth-ctx";
import { UiCtx } from "./features/ui-ctx";
import { UserCtx } from "./features/user-ctx";
import Welcome from "./components/Welcome/Welcome";
import Modal from "./components/Modal/Modal";

function App() {
  const authMgr = useContext(AuthCtx);
  const uiMgr = useContext(UiCtx);
  const userMgr = useContext(UserCtx);

  useEffect(() => {
    const isTokenExp = () => {
      const storedData = localStorage.getItem("userValidation");

      if (typeof storedData === "string") {
        const parse = JSON.parse(storedData);

        if (parse && new Date(parse.expiration) > new Date()) {
          uiMgr.dispatch({ type: "DASHBOARD" });
          userMgr.setCurrentUser({
            user: parse.username,
            token: parse.token,
            loans: parse.loans,
          });
          // SEND API CALL WITH USERNAME AND TOKEN
          // FROM PARSE OBJ
          // RESET USER WITH RESPONSE
          return authMgr.setIsAuth(true);
        }

        return authMgr.setIsAuth(false);
      }
    };
    isTokenExp();
  }, []);

  return (
    <>
      {uiMgr.state.showModal && <Modal />}
      {!authMgr.isAuth && <Welcome />}
    </>
  );
}

export default App;
