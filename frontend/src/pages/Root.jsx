import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function Root() {
  return (
    <div className="flex h-screen">
      <div className="w-full absolute bg-white sm:relative sm:w-60 lg:w-64 ">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        {/* Header */}

        <div className="flex-1 p-4">
          {/* Page */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Root;
