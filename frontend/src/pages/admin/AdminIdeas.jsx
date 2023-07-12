import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Snackbar, Alert } from "@mui/material";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import TableOfIdeas from "../../components/admin/adminIdeas/TableOfIdeas";
import { apiAdminIdeas } from "../../services/api.admin.ideas";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function AdminIdeas() {
  const { t } = useTranslation();
  const {
    alertAdminOpen,
    setAlertAdminOpen,
    alertAdminMessage,
    setAlertAdminMessage,
  } = useContext(AlertToastContext);
  const [ideaList, setIdealist] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertAdminMessage("Success");
    setAlertAdminOpen(false);
  };

  useEffect(() => {
    apiAdminIdeas()
      .then((res) => {
        if (res.status === 200) {
          setIdealist(res.data);
        } else {
          console.error("Cannot get the list of Ideas");
        }
      })
      .catch((error) =>
        console.error("error from admin_ideas getting the list of Ideas", error)
      );
    setUpdateList(false);
  }, [updateList]);

  return (
    <div className="admin-users w-full h-full pt-4 lg:pr-6 px-4 flex flex-col">
      <header className="w-full lg:h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>{t("pages.adminpannel.ideas.title")}</h2>
          <div className="my-4">
            <Link to="../../ideas/new" relative="path">
              <ActionButton icon={<PlusIcon />} text={t("buttons.addidea")} />
            </Link>
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <CounterCard
            icon={<LightBulbIcon className="rotate-45" />}
            text={t("pages.adminpannel.ideas.counter")}
            count={ideaList.length}
          />
        </div>
      </header>
      <main className="admin-user-board my-4 grow">
        <TableOfIdeas ideaList={ideaList} setUpdateList={setUpdateList} />
      </main>

      <Snackbar
        open={alertAdminOpen}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertAdminMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default AdminIdeas;
