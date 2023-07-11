import { Alert, Snackbar, AlertTitle } from "@mui/material";
import PropTypes from "prop-types";

function AlertOnSave({
  open,
  setOpen,
  severity = "success",
  message,
  title,
  onClose = () => {},
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => {
        onClose();
        setOpen(false);
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

AlertOnSave.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  severity: PropTypes.oneOf(["error", "success", "info", "warning"]),
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

AlertOnSave.defaultProps = {
  onClose: () => {},
  severity: "success",
};

export default AlertOnSave;
