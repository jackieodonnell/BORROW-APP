import React, { createContext, useState } from "react";
import { User } from "../models/user";

const currentUserTemplate = {
  user: "",
  reputation: "",
  token: "",
  loans: [],
};

interface Value {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  clearCurrentUser: () => void;
}

export const UserCtx = createContext<Value>({
  currentUser: currentUserTemplate,
  setCurrentUser: () => {},
  clearCurrentUser: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>(currentUserTemplate);

  const clearCurrentUser = () => setCurrentUser(currentUserTemplate);

  return (
    <UserCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
        clearCurrentUser,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
