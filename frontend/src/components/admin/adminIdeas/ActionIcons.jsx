import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from "@mui/material";
import {
  EyeIcon,
  PencilSquareIcon,
  ArchiveBoxArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DialogConfirm from "../DialogConfirm";
import { AlertToastContext } from "../../../contexts/AlertToastContext";
import {
  apiAdminArchiveIdea,
  apiAdminDeleteIdea,
} from "../../../services/api.admin.ideas";

export default function ActionIcons(props) {
  const { t } = useTranslation();
  const { idea, setUpdateList } = props;
  const { setAlertAdminOpen, setAlertAdminMessage } =
    useContext(AlertToastContext);
  const [dialConfirmArchiveIsOpen, setDialConfirmArchiveIsOpen] =
    useState(false);
  const [isConfirmedArchiveIdea, setIsConfirmedArchiveIdea] = useState(false);
  const [dialConfirmDeleteIsOpen, setDialConfirmDeleteIsOpen] = useState(false);
  const [isConfirmedDeleteIdea, setIsConfirmedDeleteIdea] = useState(false);

  const handleArchive = (id) => {
    apiAdminArchiveIdea(id)
      .then((res) => {
        if (res.status === 200) {
          setAlertAdminMessage(
            t("pages.adminpannel.ideas.alert.succes.archive")
          );
          setAlertAdminOpen(true);
          setUpdateList(true);
        } else {
          console.error("Cannot archive idea");
        }
      })
      .finally(() => setIsConfirmedArchiveIdea(false))
      .catch((error) =>
        console.error("error from admin, archiving idea", error)
      );
  };

  const handleDelete = (id) => {
    apiAdminDeleteIdea(id)
      .then((res) => {
        if (res.status === 200) {
          setAlertAdminMessage(
            t("pages.adminpannel.ideas.alert.succes.delete")
          );
          setAlertAdminOpen(true);
          setUpdateList(true);
        } else {
          console.error("Cannot delete idea");
        }
      })
      .finally(() => setIsConfirmedArchiveIdea(false))
      .catch((error) =>
        console.error("error from admin, archiving idea", error)
      );
  };

  useEffect(() => {
    if (isConfirmedArchiveIdea) {
      handleArchive(idea.id);
      setIsConfirmedArchiveIdea(false);
    }

    if (isConfirmedDeleteIdea) {
      handleDelete(idea.id);
      setIsConfirmedDeleteIdea(false);
    }
  }, [isConfirmedArchiveIdea, isConfirmedDeleteIdea]);

  return (
    <>
      <Link to={`/ideas/${idea.id}`}>
        <Tooltip title={t("pages.adminpannel.ideas.tooltip.view")} arrow>
          <IconButton>
            <EyeIcon className="w-4 text-green-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Link to={`/ideas/${idea.id}/edit`}>
        <Tooltip title={t("pages.adminpannel.ideas.tooltip.edit")} arrow>
          <IconButton>
            <PencilSquareIcon className="w-4 text-yellow-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip title={t("pages.adminpannel.ideas.tooltip.archive")} arrow>
        <IconButton onClick={() => setDialConfirmArchiveIsOpen(true)}>
          <ArchiveBoxArrowDownIcon className="w-4 text-sky-600" />
        </IconButton>
      </Tooltip>
      <DialogConfirm
        dialConfirmIsOpen={dialConfirmArchiveIsOpen}
        setDialConfirmIsOpen={setDialConfirmArchiveIsOpen}
        setIsConfirmed={setIsConfirmedArchiveIdea}
        title={`${t("pages.adminpannel.ideas.dialogConfirm.title")} : ${
          idea.title
        }`}
      />

      <Tooltip title={t("pages.adminpannel.ideas.tooltip.delete")} arrow>
        <IconButton onClick={() => setDialConfirmDeleteIsOpen(true)}>
          <TrashIcon className="w-4 text-red-600" />
        </IconButton>
      </Tooltip>
      <DialogConfirm
        dialConfirmIsOpen={dialConfirmDeleteIsOpen}
        setDialConfirmIsOpen={setDialConfirmDeleteIsOpen}
        setIsConfirmed={setIsConfirmedDeleteIdea}
        title={`Deleting idea : ${idea.title}`}
      />
    </>
  );
}

ActionIcons.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      agency: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
