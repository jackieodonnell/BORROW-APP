import React, { useState, useContext } from "react";
import { AuthCtx } from "./features/auth-ctx";
import { UiCtx } from "./features/ui-ctx";
import Welcome from "./components/Welcome/Welcome";
import Modal from "./components/Modal/Modal";

function App() {
  const authMgr = useContext(AuthCtx);
  const uiMgr = useContext(UiCtx);

  return (
    <>
      {uiMgr.state.showModal && <Modal />}
      {!authMgr.isAuth && <Welcome />}
    </>
  );
}

export default App;
