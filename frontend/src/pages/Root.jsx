import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function Root() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-fuchsia-100">
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
