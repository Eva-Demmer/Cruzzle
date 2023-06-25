import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { PlusIcon, KeyIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import apiUsers from "../../services/api.users";
import TableOfUsers from "../../components/admin/adminUsers/TableOfUsers";

function AdminUsers() {
  const [userList, setUserlist] = useState([]);

  const handleAddUser = () => {
    console.info("add user");
  };

  const handleResetPassword = () => {
    console.info("reset password");
  };

  useEffect(() => {
    apiUsers()
      .then((data) => setUserlist(data))
      .catch((error) =>
        console.error("error from amin users getting the list of users", error)
      );
  }, []);

  return (
    <div className="admin-users w-full py-4 lg:pr-6 px-4">
      <header className="w-full h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>Users</h2>
          <div className="my-4 flex flex-col gap-4 md:block">
            <ActionButton
              icon={<PlusIcon />}
              text="Add user"
              onClick={handleAddUser}
            />
            <ActionButton
              icon={<KeyIcon />}
              text="Reset user password"
              onClick={handleResetPassword}
            />
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <CounterCard
            icon={<UserIcon />}
            text="Total Users"
            count={userList.length}
          />
        </div>
      </header>
      <main className="admin-user-board my-4">
        <TableOfUsers userList={userList} />
      </main>
    </div>
  );
}
export default AdminUsers;
