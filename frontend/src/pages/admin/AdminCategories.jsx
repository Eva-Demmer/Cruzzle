import { useEffect, useState } from "react";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import TableOfCategories from "../../components/admin/adminCategories/TableOfCategories";
import apiCategories from "../../services/api.categories";

function AdminCategories() {
  const [categoriesList, setCategorieslist] = useState([]);

  const handleAddCategory = () => {
    console.info("add category");
  };

  useEffect(() => {
    apiCategories()
      .then((data) => setCategorieslist(data))
      .catch((error) =>
        console.error(
          "error from admin_categories getting the list of categories",
          error
        )
      );
  }, []);

  return (
    <div className="admin-users w-full py-4 lg:pr-6 px-4">
      <header className="w-full h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>Categories</h2>
          <div className="my-4">
            <ActionButton
              icon={<PlusIcon />}
              text="Add category"
              onClick={handleAddCategory}
            />
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <CounterCard
            icon={<Square3Stack3DIcon />}
            text="Total ideas"
            count={categoriesList.length}
          />
        </div>
      </header>
      <main className="admin-user-board my-4">
        <TableOfCategories categoriesList={categoriesList} />
      </main>
    </div>
  );
}
export default AdminCategories;
