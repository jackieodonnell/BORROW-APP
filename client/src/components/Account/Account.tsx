import classes from "./Account.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import accountPic from "../../assets/images/account-hover.png";
import Nav from "../Nav/Nav";
import { AuthCtx } from "../../features/auth-ctx";

const Account: React.FC = () => {
  const userMgr = useContext(UserCtx);
  const authMgr = useContext(AuthCtx);

  return (
    <section className={classes.section}>
      <span
        className="material-symbols-outlined"
        onClick={() => authMgr.onLogout()}
      >
        logout
      </span>

      <img src={accountPic} className={classes.avatar} />
      <div className={classes.idBox}>
        <p className={classes.p}>ID</p>
        <p className={classes.user}>{userMgr.currentUser.user}</p>
      </div>
      <div className={classes.idBox}>
        <p className={classes.p}>PAYBACK SCORE</p>
        <p className={classes.user}>{userMgr.currentUser.reputation}</p>
      </div>
      <Nav />
    </section>
  );
};

export default Account;
