import { IconButton, Tooltip } from "@mui/material";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export default function ActionIcons({ category, setUpdateList }) {
  const handleEdit = () => {
    console.info(`Edit Idea ${category.id}`);
  };
  console.info(typeof setUpdateList);

  const handleDelete = () => {
    console.info(`Delete Idea ${category.id}`);
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
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    _count: PropTypes.shape({
      idea_category: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
