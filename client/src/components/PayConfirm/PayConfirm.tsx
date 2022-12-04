import classes from "../../styles_common/common.module.css";
import { useState, useContext } from "react";
import { UiCtx } from "../../features/ui-ctx";
import { LoanActionCtx } from "../../features/loan-action-ctx";
import Rating from "../Rating/Rating";

const PayConfirm: React.FC = () => {
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

      <Rating setTransRate={setTransRate} transRate={transRate} />

      <form className={classes.form}>
        <input
          value="Confirm"
          type="submit"
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            let reqObj = loanActMgr.currentTransaction;
            reqObj.transaction_rating = transRate;
            loanActMgr.onConfirmLoan(reqObj, "paid");
          }}
        ></input>
        <button
          type="submit"
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            uiMgr.dispatch({ type: "DASHBOARD" });
          }}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default PayConfirm;
