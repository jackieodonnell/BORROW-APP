export type ModalActionType =
  | { type: "CLOSE" }
  | { type: "AUTH" }
  | { type: "LOADING" }
  | { type: "DASHBOARD" }
  | { type: "DASHBOARD" }
  | { type: "ACCOUNT" }
  | { type: "SEARCH" };

export type ModalStateType = {
  showModal: boolean;
  loading: boolean;
  showAuth: boolean;
  showDashboard: boolean;
  showAccount: boolean;
  showSearch: boolean;
};

export const ModalState = {
  showModal: false,
  loading: false,
  showAuth: false,
  showDashboard: false,
  showAccount: false,
  showSearch: false,
};

const ModalRed = (state: ModalStateType, action: ModalActionType) => {
  switch (action.type) {
    case "AUTH": {
      return {
        ...ModalState,
        showModal: true,
        showAuth: true,
      };
    }
    case "LOADING": {
      return {
        ...ModalState,
        showModal: true,
        loading: true,
      };
    }

    case "DASHBOARD": {
      return {
        ...ModalState,
        showModal: true,
        showDashboard: true,
      };
    }

    case "ACCOUNT": {
      return {
        ...ModalState,
        showModal: true,
        showAccount: true,
      };
    }

    case "SEARCH": {
      return {
        ...ModalState,
        showModal: true,
        showSearch: true,
      };
    }

    case "CLOSE": {
      console.log("Closing");
      return { ...ModalState };
    }
    default:
      return { ...ModalState };
  }
};

export default ModalRed;
