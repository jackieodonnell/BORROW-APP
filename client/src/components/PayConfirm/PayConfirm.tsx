import classes from "./PayConfirm.module.css";
import { Loans } from "../../models/user";
import { useState, useContext } from "react";
import { UiCtx } from "../../features/ui-ctx";
import submitActive from "../../assets/images/submit-hover.png";
import submitInactive from "../../assets/images/submit-inactive.png";
import { LoanActionCtx } from "../../features/loan-action-ctx";

const PayConfirm: React.FC = () => {
  const [submitHover, setSubmitHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
  const uiMgr = useContext(UiCtx);
  const loanActMgr = useContext(LoanActionCtx);

  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>Confirm you got paid!</h3>
      <p className={classes.p}>
        and rate{" "}
        <span className={classes.span}>
          {loanActMgr.currentTransaction.borrower}
        </span>
      </p>
      <form className={classes.form}>
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={submitHover ? submitActive : submitInactive}
            onMouseOver={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            onClick={() =>
              loanActMgr.onConfirmLoan(loanActMgr.currentTransaction, "paid")
            }
          />
        </button>
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={cancelHover ? submitActive : submitInactive}
            onMouseOver={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            onClick={() => uiMgr.dispatch({ type: "DASHBOARD" })}
          />
        </button>
      </form>
    </section>
  );
};

export default PayConfirm;
