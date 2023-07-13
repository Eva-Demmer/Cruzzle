import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiUsersLogin } from "../../services/api.users";
import OverlayLogin from "../overlays/OverlayLogin";

function LoginForm() {
  const { t } = useTranslation();
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const validateMail = (mailInput) => {
    const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return mailRegex.test(mailInput);
  };

  const handleMailChange = (e) => {
    const inputValue = e.target.value;
    setMail(inputValue);
    setMailError(!validateMail(inputValue));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled out
    if (mail === "" || password === "") {
      setAlertMessage(t("pages.login.alert.error.email"));
      setShowAlert(true);
    } else {
      try {
        const { token } = await apiUsersLogin(mail, password);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            setAlertMessage(t("pages.login.alert.error.wrong"));
            setShowAlert(true);
          } else if (status === 404) {
            setAlertMessage(t("pages.login.alert.error.wrong"));
            setShowAlert(true);
          } else {
            setAlertMessage(t("pages.login.alert.error.server"));
            setShowAlert(true);
          }
        } else {
          setAlertMessage(t("pages.login.alert.error.server"));
          setShowAlert(true);
        }
      }
    }
  };

  const handleCloseAlert = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Paper elevation={6} className="p-5 max-w-sm">
          <h2 className="text-center">{t("pages.login.title")}</h2>
          <p className="my-8 text-center">{t("pages.login.subtitle")}</p>
          <TextField
            id="login-mail"
            type="mail"
            label={t("pages.login.textfield.mail.label")}
            name="mail"
            value={mail}
            autoComplete="mail"
            autoFocus
            onChange={handleMailChange}
            error={mailError}
            helperText={
              mailError ? t("pages.login.textfield.mail.helpertext") : ""
            }
            variant="outlined"
            required
            fullWidth
          />
          <FormControl
            variant="outlined"
            required
            fullWidth
            className="mt-4 mb-2"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {t("pages.login.textfield.password.label")}
            </InputLabel>
            <OutlinedInput
              id="login-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t("pages.login.textfield.password.label")}
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <OverlayLogin />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            className="mt-4"
            onClick={handleSubmit}
          >
            {t("buttons.login")}
          </Button>
        </Paper>
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="error" onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginForm;
