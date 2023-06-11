import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen px-0 py-4 overflow-x-hidden overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-primary bg-opacity-5">
      <div className="flex flex-col items-center">Logo</div>
      <div className="flex flex-col items-center mt-6 -mx-2">Avatar</div>
      <div className="flex flex-col flex-1 mt-12">
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="/ideas">Ideas</Link>
        <Link to="/ideas/1">Idea</Link>
        <Link to="/ideas/new">Cruzzle</Link>
        <Link to="/favorits">Favorits</Link>
        <Link to="/users/1">Profile</Link>
        <Link to="/users/1/edit">Edit Profile</Link>
        <Link to="/users">Community</Link>
        <Link to="/admin/users">Admin Users</Link>
        <Link to="/admin/ideas">Admin Ideas</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </aside>
  );
}
export default Sidebar;
