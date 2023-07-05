import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { apiAdminDeleteCategory } from "../../../services/api.admin.categories";
import DialogUpdateCategory from "./DialogUpdateCategory";

export default function ActionIcons({
  category,
  setUpdateList,
  setOpenAlert,
  setAlertMessage,
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = () => {
    setOpenDialog(true);
  };

  const handleDelete = () => {
    apiAdminDeleteCategory(category.id)
      .then((res) => {
        if (res.status === 200) {
          setUpdateList(true);
        } else {
          console.error("Cannot delete category");
        }
      })
      .catch((err) => console.error("Error deleting category", err));
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

      <DialogUpdateCategory
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        category={category}
        setUpdateList={setUpdateList}
        setOpenAlert={setOpenAlert}
        setAlertMessage={setAlertMessage}
      />
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
  setOpenAlert: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
};
