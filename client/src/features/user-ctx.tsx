import React, { createContext, useState } from "react";
import { User } from "../models/user";

const currentUserTemplate = {
  user: "",
  token: "",
  loans: [],
};

interface Value {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  clearCurrentUser: () => void;
  isLending: boolean;
  setIsLending: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserCtx = createContext<Value>({
  currentUser: currentUserTemplate,
  setCurrentUser: () => {},
  clearCurrentUser: () => {},
  isLending: false,
  setIsLending: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>(currentUserTemplate);
  const [isLending, setIsLending] = useState(false);

  const clearCurrentUser = () => setCurrentUser(currentUserTemplate);

  return (
    <UserCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
        clearCurrentUser,
        isLending,
        setIsLending,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
