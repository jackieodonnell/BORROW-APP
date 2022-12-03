import classes from "./Dashboard.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import Nav from "../Nav/Nav";
import LoanList from "../LoanList/LoanList";
import { LoanActionCtx } from "../../features/loan-action-ctx";

const Dashboard: React.FC = () => {
  const userMgr = useContext(UserCtx);
  const loanActMgr = useContext(LoanActionCtx);

  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>{userMgr.currentUser.user}'s</h2>
      <p className={classes.p}>Money Moves</p>
      {loanActMgr.serverErr && (
        <p className={classes.feedback}>
          Sorry, something went wrong, please try again.
        </p>
      )}
      <LoanList />
      <Nav />
    </section>
  );
};

export default Dashboard;
