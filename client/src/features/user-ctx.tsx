import React, { createContext, useState } from "react";
import { User } from "../models/user";

interface Value {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserCtx = createContext<Value>({
  currentUser: {
    user: "",
    token: "",
    loans: [],
  },
  setCurrentUser: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>({
    user: "",
    token: "",
    loans: [],
  });
  return (
    <UserCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
