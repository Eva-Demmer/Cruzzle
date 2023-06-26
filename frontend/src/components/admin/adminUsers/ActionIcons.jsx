import { IconButton, Tooltip } from "@mui/material";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ActionIcons(props) {
  const { userId } = props;

  return (
    <Link to={`/users/${userId}`}>
      <Tooltip title="Visit user profile" arrow>
        <IconButton>
          <EyeIcon className="w-4 text-green-600" />
        </IconButton>
      </Tooltip>
    </Link>
  );
}

ActionIcons.propTypes = {
  userId: PropTypes.number.isRequired,
};
