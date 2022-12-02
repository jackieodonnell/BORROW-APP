import classes from "./PayConfirm.module.css";
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
  const [transRate, setTransRate] = useState(5);
  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>
        Confirm you got paid {loanActMgr.currentTransaction.amount}
      </h3>
      <p className={classes.p}>
        and rate{" "}
        <span className={classes.span}>
          {loanActMgr.currentTransaction.borrower}
        </span>
      </p>
      <input
        className={classes.rate}
        value={transRate}
        onChange={(e) => {
          if (Number(e.target.value) > 5) {
            return;
          }
          setTransRate(parseInt(e.target.value, 10));
        }}
        type={"number"}
        min={1}
        max={5}
      />
      <form className={classes.form}>
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={submitHover ? submitActive : submitInactive}
            onMouseOver={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            onClick={() => {
              let reqObj = loanActMgr.currentTransaction;
              reqObj.transaction_rating = transRate;
              loanActMgr.onConfirmLoan(reqObj, "paid");
            }}
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
