import classes from "./Confirmation.module.css";
import submitActive from "../../assets/images/submit-hover.png";
import submitInactive from "../../assets/images/submit-inactive.png";
import { useState, useContext } from "react";
import { NewLoanCtx } from "../../features/new-loan-ctx";
import { UserCtx } from "../../features/user-ctx";
import { UiCtx } from "../../features/ui-ctx";

const Confirmation: React.FC = () => {
  const newLoanMgr = useContext(NewLoanCtx);
  const userMgr = useContext(UserCtx);
  const uiMgr = useContext(UiCtx);
  const [submitHover, setSubmitHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>
        {userMgr.isLending
          ? newLoanMgr.loanData.borrower
          : newLoanMgr.loanData.lender}
      </h3>
      <p className={classes.p}>
        Has a reputation score of {newLoanMgr.reputation}
      </p>
      <p className={classes.p}>Would you like to proceed?</p>

      <form className={classes.form}>
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={submitHover ? submitActive : submitInactive}
            onMouseOver={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            onClick={newLoanMgr.createLoan}
          />
        </button>
        <button type="submit" className={classes.submit}>
          <img
            className={classes.submitImg}
            src={cancelHover ? submitActive : submitInactive}
            onMouseOver={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            onClick={() => uiMgr.dispatch({ type: "SEARCH" })}
          />
        </button>
      </form>
    </section>
  );
};

export default Confirmation;
