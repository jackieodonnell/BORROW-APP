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

  let currentUser = userMgr.currentUser.user;

  return (
    <li
      onClick={(e) => {
        e.preventDefault();
        if (obj.borrower !== userMgr.currentUser.user && btnActive.pending) {
          loanActMgr.setCurrentTransaction(obj);
          loanActMgr.searchBorrower();
        } else if (btnActive.loans && currentUser === obj.lender) {
          uiMgr.dispatch({ type: "PAYCONFIRM" });
          loanActMgr.setCurrentTransaction(obj);
        }
      }}
      className={
        (btnActive.pending || btnActive.loans) && currentUser === obj.lender
          ? classes.liCursor
          : classes.li
      }
    >
      <p className={classes.pUser}>
        {obj.borrower === currentUser ? obj.lender : obj.borrower}
        {btnActive.paidBack &&
          obj.lender === currentUser &&
          ` ${obj.transaction_rating}`}
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
