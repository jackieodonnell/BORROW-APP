import classes from "./LoanItem.module.css";
import { useContext, useState } from "react";
import { UserCtx } from "../../features/user-ctx";
import { Loans } from "../../models/user";
import { LoanActionCtx } from "../../features/loan-action-ctx";
import { UiCtx } from "../../features/ui-ctx";

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
    <li className={classes.li}>
      <p className={classes.pUser}>
        {obj.borrower === currentUser ? obj.lender : obj.borrower}
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
      {btnActive.pending && currentUser === obj.lender && (
        <p className={classes.x}>
          <span
            className={classes.span1}
            onClick={() => loanActMgr.onConfirmLoan(obj, "denied")}
          >
            X
          </span>{" "}
          <span
            className={classes.span2}
            onClick={() => loanActMgr.onConfirmLoan(obj, "approved")}
          >
            ✓
          </span>
        </p>
      )}
      {btnActive.loans && currentUser === obj.lender && (
        <p className={classes.x}>
          <span
            className={classes.span2}
            // onClick={() => loanActMgr.onConfirmLoan(obj, "paid")}
            onClick={() => {
              uiMgr.dispatch({ type: "PAYCONFIRM" });
              loanActMgr.setCurrentTransaction(obj);
            }}
          >
            ✓
          </span>
        </p>
      )}
    </li>
  );
};

export default LoanItem;
