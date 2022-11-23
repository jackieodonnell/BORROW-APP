import classes from "./Dashboard.module.css";
import { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import Nav from "../Nav/Nav";
import LoanList from "../LoanList/LoanList";

const Dashboard: React.FC = () => {
  const userMgr = useContext(UserCtx);

  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>{userMgr.currentUser.user}'s</h2>
      <p className={classes.p}>Money Moves</p>
      <LoanList />
      <Nav />
    </section>
  );
};

export default Dashboard;
