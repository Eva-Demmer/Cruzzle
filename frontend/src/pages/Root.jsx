import { Outlet } from "react-router-dom";
import { useContext, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderNav from "../components/topbar/HeaderNav";
import { sm } from "../utils/mediaQueries";
import { MenuContext } from "../contexts/MenuContext";
import { ScrollContext } from "../contexts/ScrollContext";

function Root() {
  const smallQuery = useMediaQuery(sm);
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const { divRef } = useContext(ScrollContext);

  useLayoutEffect(() => {
    if (smallQuery && !activeMenu) {
      setActiveMenu(true);
    }
    if (!smallQuery && activeMenu) {
      setActiveMenu(false);
    }
  }, [smallQuery]);

  return (
    <div className="flex h-screen overflow-hidden">
      {smallQuery && <Sidebar />}
      <div
        className="h-full relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
        ref={divRef}
        id="scrollbar"
      >
        <div className=" sticky flex flex-col top-0 z-50 w-full">
          <HeaderNav />
          {!smallQuery && activeMenu && <Sidebar />}
        </div>
        <main className="grow h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Root;
