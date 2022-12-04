import classes from "./Auth.module.css";
import cancelActive from "../../assets/images/X-hover.png";
import cancelInactive from "../../assets/images/X-inactive.png";
import submitActive from "../../assets/images/submit-hover.png";
import submitInactive from "../../assets/images/submit-inactive.png";
import { useContext, useState } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { UiCtx } from "../../features/ui-ctx";

const Auth: React.FC = () => {
  const authMgr = useContext(AuthCtx);
  const uiMgr = useContext(UiCtx);
  const [isActive, setIsActive] = useState(false);
  const [isCancelActive, setCancelActive] = useState(false);

  return (
    <>
      <img
        onClick={() => uiMgr.dispatch({ type: "CLOSE" })}
        className={classes.close}
        src={isCancelActive ? cancelActive : cancelInactive}
      />
      <form className={classes.form}>
        <p className={classes.p}>{authMgr.isLoggin ? "Login" : "Register"}</p>

        {authMgr.isLoggin || (
          <label className={classes.label} htmlFor="email">
            <input
              className={classes.input}
              name="email"
              type="text"
              onChange={authMgr.onInputChange}
              value={authMgr.inputData.email}
              placeholder="Email"
            />
          </label>
        )}

        <label className={classes.label} htmlFor="username">
          <input
            className={classes.input}
            name="username"
            type="text"
            onChange={authMgr.onInputChange}
            value={authMgr.inputData.username}
            placeholder="Username"
          />
        </label>

        <label className={classes.label} htmlFor="password">
          <input
            className={classes.input}
            name="password"
            type="password"
            onChange={authMgr.onInputChange}
            value={authMgr.inputData.password}
            placeholder="Password"
          />
        </label>

        <p className={classes.feedBack}>
          {authMgr.serverErr && `${authMgr.errMsg}`}
        </p>
        <img
          onClick={authMgr.onSubmitAuth}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          className={classes.btn}
          src={isActive ? submitActive : submitInactive}
        />
      </form>
    </>
  );
};

export default Auth;
