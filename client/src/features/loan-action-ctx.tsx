import React, { createContext, useState, useContext } from "react";
import { UiCtx } from "./ui-ctx";
import { UserCtx } from "./user-ctx";
import axios from "axios";
import { Loans } from "../models/user";

const transactionTemplate = {
  loan_id: 0,
  lender: "",
  borrower: "",
  status: "",
  creation_date: "",
  due_date: "",
  amount: "",
  description: "",
  payment_date: "",
  transaction_rating: 0,
};

type CtxType = {
  loansToFilter: Loans[];
  setLoansToFilter: React.Dispatch<React.SetStateAction<Loans[]>>;
  onConfirmLoan: (obj: Loans, which: string) => void;
  currentTransaction: Loans;
  setCurrentTransaction: React.Dispatch<React.SetStateAction<Loans>>;
  borrowReputation: number;
  setBorrowReputation: React.Dispatch<React.SetStateAction<number>>;
  searchBorrower: (obj: Loans) => void;
  serverErr: boolean;
  setServerErr: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoanActionCtx = createContext<CtxType>({
  loansToFilter: [transactionTemplate],
  setLoansToFilter: () => {},
  onConfirmLoan: () => {},
  currentTransaction: transactionTemplate,
  setCurrentTransaction: () => {},
  borrowReputation: 0,
  setBorrowReputation: () => {},
  searchBorrower: (obj: Loans) => {},
  serverErr: false,
  setServerErr: () => {},
});

const LoanActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const uiMgr = useContext(UiCtx);
  const [borrowReputation, setBorrowReputation] = useState(0);
  const [loansToFilter, setLoansToFilter] = useState(userMgr.currentUser.loans);
  const [serverErr, setServerErr] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Loans>(transactionTemplate);

  const onConfirmLoan = async (obj: Loans, which: string) => {
    setServerErr(false);
    uiMgr.dispatch({ type: "LOADING" });
    const reqObj = userMgr.currentUser.loans.find((objStored) => {
      return objStored.loan_id === obj.loan_id;
    });

    if (which === "approved") {
      if (reqObj) {
        reqObj.status = "approved";
      }
    } else if (which === "denied") {
      if (reqObj) {
        reqObj.status = "denied";
      }
    } else if (which === "paid") {
      if (reqObj) {
        reqObj.status = "paid";
        reqObj.payment_date = new Date().toISOString();
      }
    }

    await axios
      .put(`/api/v1/loan`, reqObj)
      .then((serverRes) => {
        userMgr.setCurrentUser((prev) => {
          let reversed = serverRes.data.loans;
          reversed.reverse();
          return { ...prev, loans: reversed };
        });
        uiMgr.dispatch({ type: "DASHBOARD" });
      })
      .catch((err) => {
        setServerErr(true);
        uiMgr.dispatch({ type: "DASHBOARD" });
      });
  };

  const searchBorrower = async (obj: Loans) => {
    uiMgr.dispatch({ type: "LOADING" });
    setServerErr(false);
    await axios
      .get(`/api/v1/search/${obj.borrower}`)
      .then((serverRes) => {
        uiMgr.dispatch({ type: "LENDCONFIRM" });
        if (serverRes.data.reputation === null) return setBorrowReputation(0);
        setBorrowReputation(serverRes.data.reputation);
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "DASHBOARD" });
        setServerErr(true);
      });
  };

  return (
    <LoanActionCtx.Provider
      value={{
        loansToFilter,
        setLoansToFilter,
        onConfirmLoan,
        currentTransaction,
        setCurrentTransaction,
        borrowReputation,
        setBorrowReputation,
        searchBorrower,
        serverErr,
        setServerErr,
      }}
    >
      {children}
    </LoanActionCtx.Provider>
  );
};

export default LoanActionProvider;
