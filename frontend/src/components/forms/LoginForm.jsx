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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiUsersLogin } from "../../services/api.users";
import OverlayLogin from "../overlays/OverlayLogin";

function LoginForm() {
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
      setAlertMessage("Please fill out all the fields!");
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
            setAlertMessage("Wrong email or password.");
            setShowAlert(true);
          } else if (status === 404) {
            setAlertMessage(
              "User not found. Please contact your administrator."
            );
            setShowAlert(true);
          } else {
            setAlertMessage("Internal server error. Please try again later.");
            setShowAlert(true);
          }
        } else {
          setAlertMessage("Network error. Please try again later.");
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
          <h2 className="text-center">Login</h2>
          <p className="my-8 text-center">Please enter your login details.</p>
          <TextField
            id="login-mail"
            type="mail"
            label="Mail address"
            name="mail"
            value={mail}
            autoComplete="mail"
            autoFocus
            onChange={handleMailChange}
            error={mailError}
            helperText={mailError ? "Please enter a valid mail address." : ""}
            variant="outlined"
            required
            fullWidth
            className=""
          />
          <FormControl
            variant="outlined"
            required
            fullWidth
            className="mt-4 mb-2"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
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
              label="Password"
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
            Login
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
