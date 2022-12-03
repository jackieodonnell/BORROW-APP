import Portal from "../Portal/Portal";
import { useContext } from "react";
import { UiCtx } from "../../features/ui-ctx";
import Auth from "../Auth/Auth";
import Dashboard from "../Dashboard/Dashboard";
import Account from "../Account/Account";
import Search from "../Search/Search";
import Confirmation from "../Confirmation/Confirmation";
import Spinner from "../Spinner/Spinner";
import PayConfirm from "../PayConfirm/PayConfirm";
import LendConfirm from "../LendConfirm/LendConfirm";

const Modal: React.FC = () => {
  const uiMgr = useContext(UiCtx);

  return (
    <Portal>
      {uiMgr.state.showAuth && <Auth />}
      {uiMgr.state.showDashboard && <Dashboard />}
      {uiMgr.state.showAccount && <Account />}
      {uiMgr.state.showSearch && <Search />}
      {uiMgr.state.showConfirmation && <Confirmation />}
      {uiMgr.state.showPayConfirm && <PayConfirm />}
      {uiMgr.state.showLendConfirm && <LendConfirm />}
      {uiMgr.state.loading && <Spinner />}
    </Portal>
  );
};
export default Modal;
