import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import { apiAdminUsers } from "../../services/api.admin.users";
import TableOfUsers from "../../components/admin/adminUsers/TableOfUsers";

function AdminUsers() {
  const [userList, setUserlist] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const handleAddUser = () => {
    console.info("add user");
  };

  useEffect(() => {
    apiAdminUsers()
      .then((data) => setUserlist(data))
      .catch((error) =>
        console.error("error from amin users getting the list of users", error)
      );
  }, [updateList]);

  return (
    <div className="admin-users w-full h-full pt-4 lg:pr-6 px-4 flex flex-col">
      <header className="w-full lg:h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>Users</h2>
          <div className="my-4 flex flex-col gap-4 md:block">
            <ActionButton
              icon={<PlusIcon />}
              text="Add user"
              onClick={handleAddUser}
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
      <main className="admin-user-board my-4 grow">
        <TableOfUsers userList={userList} setUpdateList={setUpdateList} />
      </main>
    </div>
  );
}
export default AdminUsers;
