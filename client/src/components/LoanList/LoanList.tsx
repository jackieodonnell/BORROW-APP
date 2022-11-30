import classes from "./LoanList.module.css";
import { useContext, useEffect, useState } from "react";
import { UserCtx } from "../../features/user-ctx";
import LoanItem from "../LoanItem/LoanItem";

const LoanList: React.FC = () => {
  const userMgr = useContext(UserCtx);
  const [loansToFilter, setLoansToFilter] = useState(userMgr.currentUser.loans);

  const [btnActive, setBtnActive] = useState({
    pending: true,
    loans: false,
    paidBack: false,
  });

  const filter = (status: string, btnName: string) => {
    setBtnActive((prev) => {
      if (btnName === "pending") {
        return { loans: false, paidBack: false, pending: true };
      }
      if (btnName === "loans") {
        return { paidBack: false, pending: false, loans: true };
      }
      if (btnName === "paidBack") {
        return { pending: false, loans: false, paidBack: true };
      }
      return prev;
    });
    setLoansToFilter(() => {
      return userMgr.currentUser.loans.filter((obj) => {
        return obj.status === status;
      });
    });
  };

  useEffect(() => {
    filter("pending", "pending");
  }, []);

  return (
    <>
      <div className={classes.btnBox}>
        <button
          className={btnActive.pending ? classes.btnActive : classes.btn}
          onClick={() => filter("pending", "pending")}
        >
          PENDING
        </button>
        <button
          className={btnActive.loans ? classes.btnActive : classes.btn}
          onClick={() => filter("approved", "loans")}
        >
          LOANS
        </button>
        <button
          className={btnActive.paidBack ? classes.btnActive : classes.btn}
          onClick={() => filter("paid", "paidBack")}
        >
          PAID BACK
        </button>
      </div>

      <div className={classes.ulBox}>
        <div className={classes.ulParent}>
          {btnActive.pending && <p className={classes.p}>Pending borrows:</p>}
          {btnActive.paidBack && <p className={classes.p}>Paid back:</p>}
          {btnActive.loans && <p className={classes.p}>Currently owes:</p>}
          <ul className={classes.ul}>
            {loansToFilter.map((obj, index) => {
              if (obj.borrower === userMgr.currentUser.user) {
                return (
                  <LoanItem
                    key={`LOAN_${index}`}
                    obj={obj}
                    btnActive={btnActive}
                  />
                );
              }
            })}
          </ul>
        </div>
        <div className={classes.ulParent}>
          {btnActive.pending && <p className={classes.p}>Pending loans:</p>}
          {btnActive.paidBack && <p className={classes.p}>Received back:</p>}
          {btnActive.loans && <p className={classes.p}>Currently lending:</p>}

          <ul className={classes.ul}>
            {loansToFilter.map((obj, index) => {
              if (obj.borrower !== userMgr.currentUser.user) {
                return (
                  <LoanItem
                    key={`LOAN_${index}`}
                    obj={obj}
                    btnActive={btnActive}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LoanList;
