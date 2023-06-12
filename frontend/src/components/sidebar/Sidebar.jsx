import fullLogo from "../../assets/logo/fullLogo.svg";
import SideLinks from "./SideLinks";

function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen px-0 py-4 overflow-x-hidden overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-primary bg-opacity-5">
      <div className="flex flex-col items-center">
        <img className="mx-2 w-56" src={fullLogo} alt="logo" />
      </div>
      <div className="flex flex-col items-center mt-6 -mx-2">Avatar</div>
      <div className="flex flex-col flex-1 mt-12">
        <SideLinks />
      </div>
    </aside>
  );
}
export default Sidebar;
