import classes from "./Nav.module.css";
import accountActive from "../../assets/images/account-hover.png";
import accountInactive from "../../assets/images/account-inactive.png";
import trackActive from "../../assets/images/track-hover.png";
import trackInactive from "../../assets/images/track-inactive.png";
import borrowActive from "../../assets/images/borrow-hover-1.png";
import borrowInactive from "../../assets/images/borrow-inactive-1.png";
import { useState, useContext } from "react";
import { UiCtx } from "../../features/ui-ctx";
import { NewLoanCtx } from "../../features/new-loan-ctx";

const Nav: React.FC = () => {
  const uiMgr = useContext(UiCtx);
  const newLoanMgr = useContext(NewLoanCtx);
  const [accountHover, setAccountHover] = useState(false);
  const [trackHover, setTrackHover] = useState(false);
  const [borrowHover, setBorrowHover] = useState(false);

  return (
    <nav className={classes.nav}>
      <img
        src={accountHover ? accountActive : accountInactive}
        alt="account button"
        className={classes.btn}
        onClick={() => uiMgr.dispatch({ type: "ACCOUNT" })}
        onMouseOver={() => setAccountHover(true)}
        onMouseLeave={() => setAccountHover(false)}
      />
      <img
        src={trackHover ? trackActive : trackInactive}
        alt="home button"
        className={classes.btn}
        onClick={() => uiMgr.dispatch({ type: "DASHBOARD" })}
        onMouseOver={() => setTrackHover(true)}
        onMouseLeave={() => setTrackHover(false)}
      />

      <img
        src={borrowHover ? borrowActive : borrowInactive}
        alt="search button"
        className={classes.btn}
        onClick={() => {
          newLoanMgr.clearLoanData();
          uiMgr.dispatch({ type: "SEARCH" });
        }}
        onMouseOver={() => setBorrowHover(true)}
        onMouseLeave={() => setBorrowHover(false)}
      />
    </nav>
  );
};

export default Nav;
