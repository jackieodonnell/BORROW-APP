import classes from "../../styles_common/common.module.css";
import { useContext } from "react";
import { LoanActionCtx } from "../../features/loan-action-ctx";

const LendConfirm: React.FC = () => {
  const loanActMgr = useContext(LoanActionCtx);

  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>
        Lend ${loanActMgr.currentTransaction.amount} to
      </h3>
      <p className={classes.p}>
        <span className={classes.span}>
          {loanActMgr.currentTransaction.borrower}
        </span>{" "}
        who has a reputation of {loanActMgr.borrowReputation}?
      </p>
      <form className={classes.form}>
        <input
          value="Approve"
          type="submit"
          className={classes.submit}
          onClick={() =>
            loanActMgr.onConfirmLoan(loanActMgr.currentTransaction, "approved")
          }
        ></input>
        <button
          type="submit"
          onClick={() =>
            loanActMgr.onConfirmLoan(loanActMgr.currentTransaction, "denied")
          }
          className={classes.submit}
        >
          Deny
        </button>
      </form>
    </section>
  );
};

export default LendConfirm;
