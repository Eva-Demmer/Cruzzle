import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderNav from "../components/topbar/HeaderNav";
import { sm } from "../utils/mediaQueries";

function Root() {
  const smallQuery = useMediaQuery(sm);

  return (
    <div className="flex h-screen">
      <div className="w-full h-full absolute bg-white sm:relative sm:w-60 lg:w-64 ">
        <div className="absolute h-full w-full flex flex-col bg-white sm:relative sm:w-60 lg:w-64">
          {!smallQuery && <HeaderNav />}
          <Sidebar />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {smallQuery && <HeaderNav />}

        <div className="flex-1">
          {/* Page */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Root;
