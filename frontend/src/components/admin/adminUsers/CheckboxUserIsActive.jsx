import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";

export default function CheckboxUserIsActive(props) {
  const { isActiveUser, setIsActiveUser, UserId } = props;

  const handleChange = () => {
    console.info(`user ${UserId} is active : ${!isActiveUser}`);
    setIsActiveUser(!isActiveUser);
  };

  return <Checkbox checked={isActiveUser} onChange={handleChange} />;
}

CheckboxUserIsActive.propTypes = {
  isActiveUser: PropTypes.bool.isRequired,
  setIsActiveUser: PropTypes.func.isRequired,
  UserId: PropTypes.number.isRequired,
};
