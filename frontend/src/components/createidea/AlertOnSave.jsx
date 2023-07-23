import { Alert, Snackbar, AlertTitle } from "@mui/material";
import { useContext } from "react";
import { AlertOnSaveContext } from "../../contexts/AlertOnSaveContext";

function AlertOnSave() {
  const { open, setOpen, severity, message, title, onCloseAction } =
    useContext(AlertOnSaveContext);

  const handleClose = () => {
    onCloseAction();
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertOnSave;
