import classes from "./Search.module.css";
import { useContext } from "react";
import { NewLoanCtx } from "../../features/new-loan-ctx";
import Nav from "../Nav/Nav";

const Search: React.FC = () => {
  const newLoanMgr = useContext(NewLoanCtx);

  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>Borrow from</h3>
      <form className={classes.form}>
        <input
          className={classes.input}
          placeholder="username"
          required
          name="lender"
          value={newLoanMgr.loanData.lender}
          onChange={newLoanMgr.onLoanDataChange}
        />
        {newLoanMgr.serverErr && (
          <p className={classes.feedback}>User not found</p>
        )}
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
        <label className={classes.due}> Due on</label>
        <input
          type="date"
          className={classes.input}
          required
          name="due_date"
          value={newLoanMgr.loanData.due_date}
          onChange={newLoanMgr.onLoanDataChange}
        />
        <input
          value="submit"
          type="submit"
          className={classes.submit}
          onClick={(e) => newLoanMgr.searchLender(e)}
        ></input>
      </form>

      <Nav />
    </section>
  );
};

export default Search;
