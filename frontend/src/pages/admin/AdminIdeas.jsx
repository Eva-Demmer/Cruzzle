import { useEffect, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import apiIdeas from "../../services/api.ideas";
import TableOfIdeas from "../../components/admin/adminIdeas/TableOfIdeas";
// import TableOfUsers from "../../components/admin/adminUsers/TableOfUsers";

function AdminIdeas() {
  const [ideaList, setIdealist] = useState([]);

  const handleAddIdea = () => {
    console.info("add Ideas");
  };

  useEffect(() => {
    apiIdeas()
      .then((data) => setIdealist(data))
      .catch((error) =>
        console.error("error from admin_ideas getting the list of Ideas", error)
      );
  }, []);

  return (
    <div className="admin-users w-full py-4 lg:pr-6 px-4">
      <header className="w-full h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>Ideas</h2>
          <div className="my-4">
            <ActionButton
              icon={<PlusIcon />}
              text="Add idea"
              onClick={handleAddIdea}
            />
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
      <main className="admin-user-board my-4">
        <TableOfIdeas ideaList={ideaList} />
      </main>
    </div>
  );
}
export default AdminIdeas;
