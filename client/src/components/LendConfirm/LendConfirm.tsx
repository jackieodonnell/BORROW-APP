import classes from "./LendConfirm.module.css";
import submitActive from "../../assets/images/submit-hover.png";
import submitInactive from "../../assets/images/submit-inactive.png";
import { useContext, useState } from "react";
import { LoanActionCtx } from "../../features/loan-action-ctx";

const LendConfirm: React.FC = () => {
  const [submitHover, setSubmitHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
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
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={submitHover ? submitActive : submitInactive}
            onMouseOver={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            onClick={() =>
              loanActMgr.onConfirmLoan(
                loanActMgr.currentTransaction,
                "approved"
              )
            }
          />
        </button>
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={cancelHover ? submitActive : submitInactive}
            onMouseOver={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            onClick={() => {
              loanActMgr.onConfirmLoan(loanActMgr.currentTransaction, "denied");
            }}
          />
        </button>
      </form>
    </section>
  );
};

export default LendConfirm;
