import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { EyeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DialogResetPassword from "./DialogResetPassword";

export default function ActionIcons({ user, setUpdateList }) {
  const [openDialogPassword, setOpenDialogPassword] = useState(false);

  return (
    <>
      <Link to={`/users/${user.id}`}>
        <Tooltip title="Visit user profile" arrow>
          <IconButton className="my-1">
            <EyeIcon className="w-4 text-green-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip title="Reset password" arrow>
        <IconButton
          onClick={() => setOpenDialogPassword(true)}
          className="my-1"
        >
          <KeyIcon className="w-4 text-yellow-600" />
        </IconButton>
      </Tooltip>
      <DialogResetPassword
        openDialogPassword={openDialogPassword}
        setOpenDialogPassword={setOpenDialogPassword}
        user={user}
        setUpdateList={setUpdateList}
      />
    </>
  );
}

ActionIcons.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mail: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    agency: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    joined_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    position: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
