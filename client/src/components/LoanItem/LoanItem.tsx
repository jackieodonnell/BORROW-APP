import classes from "./LoanItem.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import { Loans } from "../../models/user";

const LoanItem: React.FC<{ obj: Loans }> = ({ obj }) => {
  const userMgr = useContext(UserCtx);
  let currentUser = userMgr.currentUser.user;

  return (
    <li className={classes.li}>
      <div className={classes.padLi}>
        <div className={classes.titleBox}>
          {currentUser !== obj.borrower && <p className={classes.x}>x</p>}
          <h4 className={classes.h4}>
            {obj.borrower === currentUser ? "Borrowed from" : "Lent to"}
          </h4>
        </div>
        <p className={classes.p}>
          {obj.borrower === currentUser ? obj.lender : obj.borrower}
        </p>
        <p className={classes.p}>${obj.amount}</p>
        <p className={classes.p}>{obj.creation_date.slice(0, 10)}</p>
        <p className={classes.p}>{obj.description}</p>
      </div>
    </li>
  );
};

export default LoanItem;
