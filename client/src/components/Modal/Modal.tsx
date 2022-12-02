import Portal from "../Portal/Portal";
import { useContext } from "react";
import Auth from "../Auth/Auth";
import Dashboard from "../Dashboard/Dashboard";
import Account from "../Account/Account";
import Search from "../Search/Search";
import { UiCtx } from "../../features/ui-ctx";
import Confirmation from "../Confirmation/Confirmation";
import Spinner from "../Spinner/Spinner";
import PayConfirm from "../PayConfirm/PayConfirm";
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
      {uiMgr.state.loading && <Spinner />}
    </Portal>
  );
};
export default Modal;
