import { Outlet } from "react-router-dom";
import { useContext, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderNav from "../components/topbar/HeaderNav";
import { sm } from "../utils/mediaQueries";
import { MenuContext } from "../contexts/MenuContext";

function Root() {
  const smallQuery = useMediaQuery(sm);
  const { activeMenu, setActiveMenu } = useContext(MenuContext);

  useLayoutEffect(() => {
    if (smallQuery && !activeMenu) {
      setActiveMenu(true);
    }
    if (!smallQuery && activeMenu) {
      setActiveMenu(false);
    }
  }, [smallQuery]);

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <div
        className={`${
          activeMenu ? "absolute h-full" : ""
        } flex flex-col w-full bg-white sm:relative sm:w-60 lg:w-64 sm:border-solid sm:border-t-[0px] sm:border-b-[0px] sm:border-l-[0px] sm:border-r-[1px] sm:border-gray-300`}
      >
        {!smallQuery && <HeaderNav />}
        {activeMenu && <Sidebar />}
      </div>

      <div className="flex flex-col flex-1">
        {smallQuery && <HeaderNav />}

        <div className="flex-1 overflow-y-auto">
          {/* Page */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Root;
