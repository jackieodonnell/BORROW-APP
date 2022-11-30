import classes from "./LoanItem.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
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
  let currentUser = userMgr.currentUser.user;

  return (
    <li className={classes.li}>
      <p className={classes.p}>
        {obj.borrower === currentUser ? obj.lender : obj.borrower}
      </p>
      <p className={classes.p}>${obj.amount}</p>
      <p className={classes.p}>{obj.creation_date.slice(0, 10)}</p>
      <p className={classes.p}>{obj.description}</p>
      {btnActive.pending && currentUser === obj.lender && (
        <p className={classes.x}>
          <span className={classes.span1}>X</span>{" "}
          <span
            className={classes.span2}
            onClick={() => {
              console.log(obj);
            }}
          >
            ✓
          </span>
        </p>
      )}
      {btnActive.loans && currentUser === obj.lender && (
        <p className={classes.x}>
          <span className={classes.span2}>✓</span>
        </p>
      )}
    </li>
  );
};

export default LoanItem;
