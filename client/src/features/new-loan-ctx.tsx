import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { UserCtx } from "./user-ctx";
import { UiCtx } from "./ui-ctx";
import { LoanActionCtx } from "./loan-action-ctx";
import { LoanRequest } from "../models/loan";

type NewLoanType = {
  loanData: LoanRequest;
  setLoanData: React.Dispatch<React.SetStateAction<LoanRequest>>;
  serverErr: boolean;
  setServerErr: React.Dispatch<React.SetStateAction<boolean>>;
  onLoanDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchLender: (e: React.FormEvent<HTMLInputElement>) => void;
  createLoan: (e: React.FormEvent<HTMLInputElement>) => void;
  clearLoanData: () => void;
  reputation: number;
  setReputation: React.Dispatch<React.SetStateAction<number>>;
};

export const NewLoanCtx = createContext<NewLoanType>({
  loanData: {
    lender: "",
    borrower: "",
    status: "pending",
    creation_date: new Date().toISOString(),
    due_date: "",
    amount: "",
    description: "",
    payment_date: new Date().toISOString(),
    transaction_rating: 0,
  },
  setLoanData: () => {},
  serverErr: false,
  setServerErr: () => {},
  onLoanDataChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  searchLender: (e: React.FormEvent<HTMLInputElement>) => {},
  createLoan: (e: React.FormEvent<HTMLInputElement>) => {},
  clearLoanData: () => {},
  reputation: 0,
  setReputation: () => {},
});

const NewLoanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const loanActMgr = useContext(LoanActionCtx);
  const uiMgr = useContext(UiCtx);

  const loanTemplate = {
    lender: "",
    borrower: userMgr.currentUser.user,
    status: "pending",
    creation_date: new Date().toISOString(),
    due_date: "",
    amount: "",
    description: "",
    payment_date: new Date().toISOString(),
    transaction_rating: 0,
  };

  const [loanData, setLoanData] = useState<LoanRequest>(loanTemplate);
  const [serverErr, setServerErr] = useState(false);
  const [reputation, setReputation] = useState(0);

  const onLoanDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault();
    setServerErr(false);
    setLoanData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const clearLoanData = () => {
    setLoanData({ ...loanTemplate, borrower: "", lender: "" });
  };

  const searchLender = async (e: React.FormEvent<HTMLInputElement>) => {
    uiMgr.dispatch({ type: "LOADING" });
    loanActMgr.setServerErr(false);
    e.preventDefault();
    let param = loanData.lender;

    await axios
      .get(`/api/v1/search/${param}`)
      .then((serverRes) => {
        uiMgr.dispatch({ type: "CONFIRMATION" });
        if (serverRes.data.reputation === null) return setReputation(0);
        setReputation(serverRes.data.reputation);
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "SEARCH" });
        setServerErr(true);
      });
  };

  const createLoan = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let objToSend = loanData;

    objToSend.borrower === ""
      ? (objToSend.borrower = `${userMgr.currentUser.user}`)
      : (objToSend.lender = `${userMgr.currentUser.user}`);

    uiMgr.dispatch({ type: "LOADING" });
    await axios
      .post("/api/v1/loan", objToSend)
      .then((serverRes) => {
        serverRes.data.loans.reverse();
        userMgr.setCurrentUser((prev) => {
          return { ...prev, loans: serverRes.data.loans };
        });
        uiMgr.dispatch({ type: "DASHBOARD" });
        clearLoanData();
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "CONFIRMATION" });
        loanActMgr.setServerErr(true);
      });
  };

  return (
    <NewLoanCtx.Provider
      value={{
        loanData,
        setLoanData,
        serverErr,
        setServerErr,
        onLoanDataChange,
        searchLender,
        createLoan,
        clearLoanData,
        reputation,
        setReputation,
      }}
    >
      {children}
    </NewLoanCtx.Provider>
  );
};

export default NewLoanProvider;
