import { useState, useEffect } from "react";
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
import {
  apiAdminArchiveIdea,
  apiAdminDeleteIdea,
} from "../../../services/api.admin.ideas";

export default function ActionIcons(props) {
  const { idea, setUpdateList } = props;
  const [dialConfirmArchiveIsOpen, setDialConfirmArchiveIsOpen] =
    useState(false);
  const [isConfirmedArchiveIdea, setIsConfirmedArchiveIdea] = useState(false);
  const [dialConfirmDeleteIsOpen, setDialConfirmDeleteIsOpen] = useState(false);
  const [isConfirmedDeleteIdea, setIsConfirmedDeleteIdea] = useState(false);

  const handleArchive = (id) => {
    apiAdminArchiveIdea(id)
      .then((res) => {
        if (res.status === 200) {
          setUpdateList(true);
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
          setUpdateList(true);
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
        <Tooltip title="Visit idea page" arrow>
          <IconButton>
            <EyeIcon className="w-4 text-green-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Link to={`/ideas/${idea.id}/edit`}>
        <Tooltip title="Edit idea" arrow>
          <IconButton>
            <PencilSquareIcon className="w-4 text-yellow-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip title="Archive idea" arrow>
        <IconButton onClick={() => setDialConfirmArchiveIsOpen(true)}>
          <ArchiveBoxArrowDownIcon className="w-4 text-sky-600" />
        </IconButton>
      </Tooltip>
      <DialogConfirm
        dialConfirmIsOpen={dialConfirmArchiveIsOpen}
        setDialConfirmIsOpen={setDialConfirmArchiveIsOpen}
        setIsConfirmed={setIsConfirmedArchiveIdea}
        title={`Archiving idea : ${idea.title}`}
      />

      <Tooltip title="Delete idea" arrow>
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
