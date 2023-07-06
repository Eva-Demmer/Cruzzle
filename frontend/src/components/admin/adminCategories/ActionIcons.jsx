import { useState, useEffect, useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { apiAdminDeleteCategory } from "../../../services/api.admin.categories";
import DialogUpdateCategory from "./DialogUpdateCategory";
import DialogConfirm from "../DialogConfirm";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function ActionIcons({ category, setUpdateList }) {
  const { setAlertAdminOpen, setAlertAdminMessage } =
    useContext(AlertToastContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialConfirmDeleteIsOpen, setDialConfirmDeleteIsOpen] = useState(false);
  const [isConfirmedDeleteCategory, setIsConfirmedDeleteCategory] =
    useState(false);

  const handleEdit = () => {
    setOpenDialog(true);
  };

  const handleDelete = () => {
    apiAdminDeleteCategory(category.id)
      .then((res) => {
        if (res.status === 200) {
          setUpdateList(true);
          setAlertAdminMessage("Category deleted successfully");
          setAlertAdminOpen(true);
        } else {
          console.error("Cannot delete category");
        }
      })
      .catch((err) => console.error("Error deleting category", err));
  };

  useEffect(() => {
    if (isConfirmedDeleteCategory) {
      handleDelete(category.id);
      setIsConfirmedDeleteCategory(false);
    }
  }, [isConfirmedDeleteCategory]);

  return (
    <>
      <Tooltip title="Edit idea" arrow>
        <IconButton onClick={handleEdit}>
          <PencilSquareIcon className="w-4 text-yellow-600" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete idea" arrow>
        <IconButton onClick={() => setDialConfirmDeleteIsOpen(true)}>
          <TrashIcon className="w-4 text-red-600" />
        </IconButton>
      </Tooltip>

      <DialogUpdateCategory
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        category={category}
        setUpdateList={setUpdateList}
      />

      <DialogConfirm
        dialConfirmIsOpen={dialConfirmDeleteIsOpen}
        setDialConfirmIsOpen={setDialConfirmDeleteIsOpen}
        setIsConfirmed={setIsConfirmedDeleteCategory}
        title={`Deleting category : ${category.label}`}
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
};
