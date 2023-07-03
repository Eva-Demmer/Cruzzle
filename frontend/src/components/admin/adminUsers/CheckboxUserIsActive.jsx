import { Checkbox, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";

export default function CheckboxUserIsActive(props) {
  const { isActiveUser, setIsActiveUser, userId } = props;

  const handleChange = () => {
    apiAdminUpdateUserById(userId, { is_active: !isActiveUser })
      .then((res) => {
        if (res.status === 200) {
          setIsActiveUser(!isActiveUser);
        } else {
          console.error("Cannot setting user Active/Unactive");
        }
      })
      .catch((error) => {
        console.error("Error setting user Active/Unactive", error);
      });
  };

  return (
    <Tooltip title="Acivate/Unactivate user" arrow>
      <Checkbox checked={isActiveUser} onChange={handleChange} />
    </Tooltip>
  );
}

CheckboxUserIsActive.propTypes = {
  isActiveUser: PropTypes.bool.isRequired,
  setIsActiveUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
