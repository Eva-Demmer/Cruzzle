import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderNav from "../components/topbar/HeaderNav";
import { sm } from "../utils/mediaQueries";

function Root() {
  const smallQuery = useMediaQuery(sm);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
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
        } flex flex-col w-full bg-white sm:relative sm:w-60 lg:w-64`}
      >
        {!smallQuery && (
          <HeaderNav setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        )}
        {activeMenu && <Sidebar />}
      </div>

      <div className="flex flex-col flex-1">
        {smallQuery && (
          <HeaderNav setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        )}

        <div className="flex-1">
          {/* Page */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Root;
