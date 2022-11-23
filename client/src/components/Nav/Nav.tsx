import classes from "./Nav.module.css";
import { useState, useContext } from "react";
import accountActive from "../../assets/images/account-hover.png";
import accountInactive from "../../assets/images/account-inactive.png";
import trackActive from "../../assets/images/track-hover.png";
import trackInactive from "../../assets/images/track-inactive.png";
import searchActive from "../../assets/images/search-hover.png";
import searchInactive from "../../assets/images/search-inactive.png";
import { UiCtx } from "../../features/ui-ctx";

const Nav: React.FC = () => {
  const uiMgr = useContext(UiCtx);
  const [accountHover, setAccountHover] = useState(false);
  const [trackHover, setTrackHover] = useState(false);
  const [searchHover, setSearchHover] = useState(false);
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
        src={searchHover ? searchActive : searchInactive}
        alt="search button"
        className={classes.btn}
        onClick={() => uiMgr.dispatch({ type: "SEARCH" })}
        onMouseOver={() => setSearchHover(true)}
        onMouseLeave={() => setSearchHover(false)}
      />
    </nav>
  );
};

export default Nav;
