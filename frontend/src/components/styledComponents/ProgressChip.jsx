import PropTypes from "prop-types";
import { Chip } from "@mui/material";

function ProgressChip({ className, isArchived, isDeleted }) {
  let color;
  let label;
  switch (true) {
    case isDeleted !== null:
      color = "#d32f2f";
      label = "Deleted";
      break;
    case isArchived !== null:
      color = "#AAAAAA";
      label = "Archived";
      break;
    default:
      color = "#AFE2B1";
      label = "In progress";
      break;
  }

  return (
    <Chip
      sx={{ backgroundColor: color }}
      className={className}
      size="medium"
      label={label}
    />
  );
}

ProgressChip.propTypes = {
  isArchived: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  isDeleted: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  className: PropTypes.string,
};

ProgressChip.defaultProps = {
  isArchived: null,
  isDeleted: null,
  className: "",
};

export default ProgressChip;
