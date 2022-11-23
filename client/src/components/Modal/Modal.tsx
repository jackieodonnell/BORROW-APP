import Portal from "../Portal/Portal";
import { useContext } from "react";
import Auth from "../Auth/Auth";
import Dashboard from "../Dashboard/Dashboard";
import Account from "../Account/Account";
import Search from "../Search/Search";
import { UiCtx } from "../../features/ui-ctx";
const Modal: React.FC = () => {
  const uiMgr = useContext(UiCtx);

  return (
    <Portal>
      {uiMgr.state.showAuth && <Auth />}
      {uiMgr.state.showDashboard && <Dashboard />}
      {uiMgr.state.showAccount && <Account />}
      {uiMgr.state.showSearch && <Search />}

      {/* {authMgr.state.loading && <Loading />} */}
    </Portal>
  );
};
export default Modal;
