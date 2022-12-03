import classes from "./Search.module.css";
import submitActive from "../../assets/images/submit-hover.png";
import submitInactive from "../../assets/images/submit-inactive.png";
import { useState, useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import { NewLoanCtx } from "../../features/new-loan-ctx";
import Nav from "../Nav/Nav";

const Search: React.FC = () => {
  const userMgr = useContext(UserCtx);
  const newLoanMgr = useContext(NewLoanCtx);
  const [submitHover, setSubmitHover] = useState(false);

  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>
        {userMgr.isLending ? "Lend to" : "Borrow from"}
      </h3>
      <form className={classes.form}>
        <input
          className={classes.input}
          placeholder="username"
          required
          name={userMgr.isLending ? "borrower" : "lender"}
          value={
            userMgr.isLending
              ? newLoanMgr.loanData.borrower
              : newLoanMgr.loanData.lender
          }
          onChange={newLoanMgr.onLoanDataChange}
        />
        {newLoanMgr.serverErr && <p>User not found</p>}
        <input
          className={classes.input}
          placeholder="amount"
          required
          name="amount"
          value={newLoanMgr.loanData.amount}
          onChange={newLoanMgr.onLoanDataChange}
        />
        <input
          className={classes.input}
          placeholder="for"
          required
          name="description"
          maxLength={20}
          value={newLoanMgr.loanData.description}
          onChange={newLoanMgr.onLoanDataChange}
        />
        <label> Due on</label>
        <input
          type="date"
          className={classes.input}
          required
          name="due_date"
          value={newLoanMgr.loanData.due_date}
          onChange={newLoanMgr.onLoanDataChange}
        />
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={submitHover ? submitActive : submitInactive}
            onMouseOver={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            onClick={newLoanMgr.searchLender}
          />
        </button>
      </form>

      <Nav />
    </section>
  );
};

export default Search;
