import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import TableOfIdeas from "../../components/admin/adminIdeas/TableOfIdeas";
import { apiAdminIdeas } from "../../services/api.admin.ideas";

function AdminIdeas() {
  const [ideaList, setIdealist] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    apiAdminIdeas()
      .then((data) => setIdealist(data))
      .catch((error) =>
        console.error("error from admin_ideas getting the list of Ideas", error)
      );
    setUpdateList(false);
  }, [updateList]);

  return (
    <div className="admin-users w-full h-full pt-4 lg:pr-6 px-4 flex flex-col">
      <header className="w-full lg:h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>Ideas</h2>
          <div className="my-4">
            <Link to="../../ideas/new" relative="path">
              <ActionButton icon={<PlusIcon />} text="Add idea" />
            </Link>
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <CounterCard
            icon={<LightBulbIcon className="rotate-45" />}
            text="Total ideas"
            count={ideaList.length}
          />
        </div>
      </header>
      <main className="admin-user-board my-4 grow">
        <TableOfIdeas ideaList={ideaList} setUpdateList={setUpdateList} />
      </main>
    </div>
  );
}
export default AdminIdeas;
