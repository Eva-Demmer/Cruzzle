import { IconButton } from "@mui/material";
import {
  EyeIcon,
  PencilSquareIcon,
  ArchiveBoxArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export default function ActionIcons(props) {
  const { ideaId } = props;

  const handleView = () => {
    console.info(`Go to see Idea ${ideaId}`);
  };

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
      <IconButton onClick={handleView}>
        <EyeIcon className="w-4 text-green-600" />
      </IconButton>
      <IconButton onClick={handleEdit}>
        <PencilSquareIcon className="w-4 text-yellow-600" />
      </IconButton>
      <IconButton onClick={handleArchive}>
        <ArchiveBoxArrowDownIcon className="w-4 text-sky-600" />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <TrashIcon className="w-4 text-red-600" />
      </IconButton>
    </>
  );
}

ActionIcons.propTypes = {
  ideaId: PropTypes.number.isRequired,
};
