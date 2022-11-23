import classes from "./Search.module.css";
import { useState } from "react";
import submitActive from "../../assets/images/submit-hover.png";
import submitInactive from "../../assets/images/submit-inactive.png";
import borrowActive from "../../assets/images/borrow-hover-1.png";
import borrowInactive from "../../assets/images/borrow-inactive-1.png";
import lendActive from "../../assets/images/lend-hover.png";
import lendInactive from "../../assets/images/lend-inactive.png";
import Nav from "../Nav/Nav";

const Search: React.FC = () => {
  const [submitHover, setSubmitHover] = useState(false);
  const [borrowHover, setBorrowHover] = useState(false);
  const [lendHover, setLendHover] = useState(false);
  const [searchUser, setSearchUser] = useState({ username: "" });
  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>Search User</h3>
      <form className={classes.form}>
        <input
          className={classes.input}
          placeholder="search username"
          // onChange={changeHandler}
          // value={usernameSearch}
          required
          name="username"
        />
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={submitHover ? submitActive : submitInactive}
            onMouseOver={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
          />
        </button>
      </form>
      {searchUser.username ? (
        <div id="user">
          <div>
            <p>username: Username</p>
            <p>email: Email</p>
            <p>rep: Reputation</p>
          </div>
          <img
            src={borrowHover ? borrowActive : borrowInactive}
            className="borrow-lend"
            onMouseOver={() => setBorrowHover(true)}
            onMouseLeave={() => setBorrowHover(false)}
          />

          <img
            src={lendHover ? lendActive : lendInactive}
            className="borrow-lend"
            onMouseOver={() => setLendHover(true)}
            onMouseLeave={() => setLendHover(false)}
          />
        </div>
      ) : null}
      <Nav />
    </section>
  );
};

export default Search;
