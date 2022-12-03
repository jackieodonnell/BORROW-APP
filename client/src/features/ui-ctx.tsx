import React, { createContext, useReducer } from "react";
import ModalRed, {
  ModalState,
  ModalActionType,
  ModalStateType,
} from "../reducers/modal-red";

interface Value {
  state: ModalStateType;
  dispatch: React.Dispatch<ModalActionType>;
}

export const UiCtx = createContext<Value>({
  state: ModalState,
  dispatch: () => {},
});

const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ModalRed, ModalState);

  return (
    <UiCtx.Provider
      value={{
        state,
        dispatch: dispatch,
      }}
    >
      {children}
    </UiCtx.Provider>
  );
};

export default UiProvider;
