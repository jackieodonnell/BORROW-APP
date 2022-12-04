import classes from "./Welcome.module.css";
import dolladude from "../../assets/images/dolladude.png";
import loginInactive from "../../assets/images/login-inactive.png";
import loginActive from "../../assets/images/login-hover.png";
import registerInactive from "../../assets/images/register-inactive.png";
import registerActive from "../../assets/images/register-hover.png";
import { useState, useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { UiCtx } from "../../features/ui-ctx";

const Welcome: React.FC = () => {
  const authMgr = useContext(AuthCtx);
  const uiMgr = useContext(UiCtx);
  const [loginHover, setLoginHover] = useState<boolean>(false);
  const [registerHover, setRegisterinHover] = useState<boolean>(false);

  return (
    <article className={classes.article}>
      <h1 className={classes.h1}>Welcome to</h1>
      <h2 className={classes.h2}>PayBack</h2>
      <img
        src={dolladude}
        alt="cartoon 'dolla dude' with a bat and shades on"
        className={classes.logo}
      />
      <img
        src={loginHover ? loginActive : loginInactive}
        alt="login button"
        className={classes.btn}
        onMouseOver={() => setLoginHover(true)}
        onMouseLeave={() => setLoginHover(false)}
        onClick={() => {
          authMgr.setServerErr(false);
          uiMgr.dispatch({ type: "AUTH" });
          authMgr.setIsLoggin(true);
        }}
      />

      <img
        src={registerHover ? registerActive : registerInactive}
        alt="register button"
        className={classes.btn}
        onMouseOver={() => setRegisterinHover(true)}
        onMouseLeave={() => setRegisterinHover(false)}
        onClick={() => {
          authMgr.setServerErr(false);

          authMgr.setIsLoggin(false);
          uiMgr.dispatch({ type: "AUTH" });
        }}
      />
    </article>
  );
};

export default Welcome;
