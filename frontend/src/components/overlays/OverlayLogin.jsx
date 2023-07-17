import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Box,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function OverlayLogin() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEmailError(false);
    setEmail("");
    setOpen(false);
  };

  const validateEmail = (emailInput) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailInput);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setEmailError(!validateEmail(inputValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && validateEmail(email)) {
      setAlertMessage(t("pages.login.forgetpassword.alert.success.email"));
      setShowAlert(true);
      setOpen(false);
    } else {
      setEmailError(!validateEmail(email));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleCloseAlert = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const buttonText = t("pages.login.forgetpassword.button.forgetpassword");
  const capitalizedText =
    buttonText.charAt(0).toUpperCase() + buttonText.slice(1);

  return (
    <div className="flex justify-end pb-4">
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{
          color: "#000000DE",
          fontSize: "16px",
        }}
      >
        {capitalizedText.charAt(0)}
        <span style={{ textTransform: "lowercase" }}>
          {capitalizedText.slice(1)}
        </span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t("pages.login.forgetpassword.dialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ margin: "24px 0" }}>
            {t("pages.login.forgetpassword.dialog.content")}
          </DialogContentText>
          <TextField
            id="forgot-password-email"
            type="email"
            label={t(
              "pages.login.forgetpassword.dialog.textfield.password.label"
            )}
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={
              emailError
                ? t(
                    "pages.login.forgetpassword.dialog.textfield.password.helpertext"
                  )
                : ""
            }
            variant="outlined"
            required
            fullWidth
          />

          <Box noValidate component="form" />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            autoFocus
            onClick={() => handleClose()}
          >
            {t("buttons.cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            sx={{
              boxShadow: 1,
              "&:hover": { boxShadow: 2 },
              "&:active, &.Mui-focusVisible": { boxShadow: 4 },
            }}
          >
            {t("buttons.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default OverlayLogin;
