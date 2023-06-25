import fullLogo from "../../assets/logo/fullLogo.svg";
import AvatarProfile from "../avatar/AvatarProfile";
import SideLinks from "./SideLinks";

function Sidebar() {
  return (
    <aside className="h-screen flex flex-col px-0 overflow-x-hidden overflow-y-auto bg-white z-50 sm:h-full sm:w-60 lg:w-64 sm:border-solid sm:border-t-[0px] sm:border-b-[0px] sm:border-l-[0px] sm:border-r-[1px] sm:border-gray-300">
      <div className="bg-primary-900 bg-opacity-5 h-full">
        <div className="flex-col items-center hidden sm:flex">
          <img className="mx-2 h-14 mt-2" src={fullLogo} alt="logo" />
        </div>
        <div className="flex flex-col items-center w-full">
          <AvatarProfile />
        </div>
        <div className="flex flex-col flex-1 ">
          <SideLinks />
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
