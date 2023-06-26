import { Checkbox, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

export default function CheckboxUserIsAdmin(props) {
  const { currentUserRole, isAdminUser, setIsAdminUser, userId, userRole } =
    props;

  const handleChange = () => {
    console.info(`user ${userId} is admin : ${!isAdminUser}`);
    setIsAdminUser(!isAdminUser);
  };

  return currentUserRole === 88 ? (
    <Tooltip title="set user as admin" arrow>
      <Checkbox checked={isAdminUser} onChange={handleChange} />
    </Tooltip>
  ) : (
    <span>{userRole}</span>
  );
}

CheckboxUserIsAdmin.propTypes = {
  currentUserRole: PropTypes.number.isRequired,
  isAdminUser: PropTypes.bool.isRequired,
  setIsAdminUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userRole: PropTypes.string.isRequired,
};
