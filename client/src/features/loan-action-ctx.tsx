import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { Loans } from "../models/user";
import { UiCtx } from "./ui-ctx";
import { UserCtx } from "./user-ctx";

type CtxType = {
  loansToFilter: Loans[];
  setLoansToFilter: React.Dispatch<React.SetStateAction<Loans[]>>;
  onConfirmLoan: (obj: Loans, which: string) => void;
  currentTransaction: Loans;
  setCurrentTransaction: React.Dispatch<React.SetStateAction<Loans>>;
  borrowReputation: number;
  setBorrowReputation: React.Dispatch<React.SetStateAction<number>>;
  searchBorrower: () => void;
};

export const LoanActionCtx = createContext<CtxType>({
  loansToFilter: [
    {
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
    },
  ],
  setLoansToFilter: () => {},
  onConfirmLoan: () => {},
  currentTransaction: {
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
  },
  setCurrentTransaction: () => {},
  borrowReputation: 0,
  setBorrowReputation: () => {},
  searchBorrower: () => {},
});

const LoanActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const uiMgr = useContext(UiCtx);
  const [borrowReputation, setBorrowReputation] = useState(0);
  const [loansToFilter, setLoansToFilter] = useState(userMgr.currentUser.loans);
  const [currentTransaction, setCurrentTransaction] = useState<Loans>({
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
  });

  const onConfirmLoan = async (obj: Loans, which: string) => {
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
          return { ...prev, loans: serverRes.data.loans };
        });
        uiMgr.dispatch({ type: "DASHBOARD" });
      })
      .catch((err) => {
        console.log(err);
        uiMgr.dispatch({ type: "DASHBOARD" });
      });
  };

  const searchBorrower = async () => {
    uiMgr.dispatch({ type: "LOADING" });
    await axios
      .get(`/api/v1/search/${currentTransaction.borrower}`)
      .then((serverRes) => {
        uiMgr.dispatch({ type: "LENDCONFIRM" });
        if (serverRes.data.reputation === null) return setBorrowReputation(0);
        setBorrowReputation(serverRes.data.reputation);
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "DASHBOARD" });
        console.log(err);
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
      }}
    >
      {children}
    </LoanActionCtx.Provider>
  );
};

export default LoanActionProvider;
