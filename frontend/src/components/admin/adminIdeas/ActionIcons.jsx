import { IconButton, Tooltip } from "@mui/material";
import {
  EyeIcon,
  PencilSquareIcon,
  ArchiveBoxArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ActionIcons(props) {
  const { ideaId } = props;

  const handleEdit = () => {
    console.info(`Edit Idea ${ideaId}`);
  };

  const handleArchive = () => {
    console.info(`Archive Idea ${ideaId}`);
  };

  const handleDelete = () => {
    console.info(`Delete Idea ${ideaId}`);
  };

  return (
    <>
      <Link to={`/ideas/${ideaId}`}>
        <Tooltip title="Visit idea page" arrow>
          <IconButton>
            <EyeIcon className="w-4 text-green-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Link to={`/ideas/${ideaId}/edit`}>
        <Tooltip title="Edit idea" arrow>
          <IconButton onClick={handleEdit}>
            <PencilSquareIcon className="w-4 text-yellow-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip title="Archive idea" arrow>
        <IconButton onClick={handleArchive}>
          <ArchiveBoxArrowDownIcon className="w-4 text-sky-600" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete idea" arrow>
        <IconButton onClick={handleDelete}>
          <TrashIcon className="w-4 text-red-600" />
        </IconButton>
      </Tooltip>
    </>
  );
}

ActionIcons.propTypes = {
  ideaId: PropTypes.number.isRequired,
};
