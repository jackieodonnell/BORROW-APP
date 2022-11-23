import classes from "./Account.module.css";
import { useState, useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import accountPic from "../../assets/images/account-hover.png";
import settingsActive from "../../assets/images/settings-hover.png";
import settingsInactive from "../../assets/images/settings-inactive.png";
import Nav from "../Nav/Nav";
import { AuthCtx } from "../../features/auth-ctx";

const Account: React.FC = () => {
  const userMgr = useContext(UserCtx);
  const authMgr = useContext(AuthCtx);
  const [settingsHover, setSettingsHover] = useState(false);

  return (
    <section className={classes.section}>
      <img
        src={settingsHover ? settingsActive : settingsInactive}
        className={classes.icon}
        onMouseOver={() => setSettingsHover(true)}
        onMouseLeave={() => setSettingsHover(false)}
        onClick={() => authMgr.onLogout()}
      />
      <img src={accountPic} className={classes.avatar} />

      <div className={classes.idBox}>
        <p className={classes.p}>ID</p>
        <p className={classes.user}>{userMgr.currentUser.user}</p>
      </div>
      <Nav />
    </section>
  );
};

export default Account;
