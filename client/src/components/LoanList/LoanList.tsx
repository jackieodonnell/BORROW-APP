import classes from "./LoanList.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import LoanItem from "../LoanItem/LoanItem";

const LoanList: React.FC = () => {
  const userMgr = useContext(UserCtx);

  return (
    <ul className={classes.ul}>
      {userMgr.currentUser.loans.reverse().map((obj, index) => {
        return <LoanItem key={`LOAN_${index}`} obj={obj} />;
      })}
    </ul>
  );
};

export default LoanList;
