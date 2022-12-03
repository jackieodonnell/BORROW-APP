import classes from "./LoanItem.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import { LoanActionCtx } from "../../features/loan-action-ctx";
import { UiCtx } from "../../features/ui-ctx";
import { Loans } from "../../models/user";

interface Props {
  obj: Loans;
  btnActive: {
    pending: boolean;
    loans: boolean;
    paidBack: boolean;
  };
}

const LoanItem: React.FC<Props> = ({ obj, btnActive }) => {
  const userMgr = useContext(UserCtx);
  const loanActMgr = useContext(LoanActionCtx);
  const uiMgr = useContext(UiCtx);

  return (
    <li
      onClick={(e) => {
        e.preventDefault();

        if (obj.borrower !== userMgr.currentUser.user && btnActive.pending) {
          loanActMgr.setCurrentTransaction(obj);
          loanActMgr.searchBorrower(obj);
        } else if (btnActive.loans && userMgr.currentUser.user === obj.lender) {
          uiMgr.dispatch({ type: "PAYCONFIRM" });
          loanActMgr.setCurrentTransaction(obj);
        }
      }}
      className={
        (btnActive.pending || btnActive.loans) &&
        userMgr.currentUser.user === obj.lender
          ? classes.liCursor
          : classes.li
      }
    >
      <p className={classes.pUser}>
        <span>
          {obj.borrower === userMgr.currentUser.user
            ? obj.lender
            : obj.borrower}
        </span>
        <span className={classes.dataSpan}>
          {btnActive.paidBack &&
            obj.lender === userMgr.currentUser.user &&
            ` ${obj.transaction_rating}/5`}
        </span>
      </p>
      <p className={classes.p}>
        <span>Amount:</span>{" "}
        <span className={classes.dataSpan}>${obj.amount}</span>
      </p>
      <p className={classes.p}>
        {btnActive.loans && "Due:"}
        {btnActive.pending ? "Requested:" : null}
        {btnActive.paidBack ? "Paid:" : null}

        <span className={classes.dataSpan}>
          {btnActive.loans && `${obj.due_date.slice(2, 10)}`}
          {btnActive.pending && `${obj.creation_date.slice(2, 10)}`}
          {btnActive.paidBack && `${obj.payment_date.slice(2, 10)}`}
        </span>
      </p>
      <p className={classes.p}>
        <span>For:</span>
        <span className={classes.dataSpan}>{obj.description}</span>
      </p>
    </li>
  );
};

export default LoanItem;
