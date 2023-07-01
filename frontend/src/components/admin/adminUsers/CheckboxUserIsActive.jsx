import { Checkbox, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

export default function CheckboxUserIsActive(props) {
  const { isActiveUser, setIsActiveUser, userId } = props;

  const handleChange = () => {
    console.info(`user ${userId} is active : ${!isActiveUser}`);
    setIsActiveUser(!isActiveUser);
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
