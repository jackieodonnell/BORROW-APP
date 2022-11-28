import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./features/auth-ctx";
import UiProvider from "./features/ui-ctx";
import UserProvider from "./features/user-ctx";
import NewLoanProvider, { NewLoanCtx } from "./features/new-loan-ctx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UiProvider>
      <UserProvider>
        <AuthProvider>
          <NewLoanProvider>
            <App />
          </NewLoanProvider>
        </AuthProvider>
      </UserProvider>
    </UiProvider>
  </React.StrictMode>
);
