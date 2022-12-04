import classes from "../../styles_common/common.module.css";
import { useContext } from "react";
import { NewLoanCtx } from "../../features/new-loan-ctx";
import { UiCtx } from "../../features/ui-ctx";

const Confirmation: React.FC = () => {
  const newLoanMgr = useContext(NewLoanCtx);
  const uiMgr = useContext(UiCtx);

  return (
    <section className={classes.section}>
      <h3 className={classes.h3}>{newLoanMgr.loanData.lender}</h3>
      <p className={classes.p}>
        Has a reputation score of {newLoanMgr.reputation}
      </p>
      <p className={classes.p}>Would you like to proceed?</p>

      <form className={classes.form}>
        <input
          type="submit"
          value="borrow"
          className={classes.submit}
          onClick={(e) => newLoanMgr.createLoan(e)}
        ></input>
        <button
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            uiMgr.dispatch({ type: "SEARCH" });
          }}
        >
          cancel
        </button>
      </form>
    </section>
  );
};

export default Confirmation;
