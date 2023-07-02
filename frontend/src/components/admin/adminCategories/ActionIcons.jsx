import { IconButton, Tooltip } from "@mui/material";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export default function ActionIcons(props) {
  const { ideaId } = props;

  const handleEdit = () => {
    console.info(`Edit Idea ${ideaId}`);
  };

  const handleDelete = () => {
    console.info(`Delete Idea ${ideaId}`);
  };

  return (
    <>
      <Tooltip title="Edit idea" arrow>
        <IconButton onClick={handleEdit}>
          <PencilSquareIcon className="w-4 text-yellow-600" />
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
