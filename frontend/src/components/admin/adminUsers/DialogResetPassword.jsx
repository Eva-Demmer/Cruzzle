import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogResetPassword({
  openDialogPassword,
  setOpenDialogPassword,
  user,
  setUpdateList,
}) {
  const { setAlertAdminOpen, setAlertAdminMessage } =
    useContext(AlertToastContext);

  // Fields values
  const [email, setEmail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Fiels values validation
  const [emailError, setEmailError] = useState(false);
  const [emailErroressage, setEmailErrorMessage] = useState("Incorrect entry");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  // Handle values change
  const handleChangeMail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((show) => !show);

  const handleMouseDownPasswordConfirmation = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setEmail(user.mail);
    setEmailError(false);
    setPassword("");
    setPasswordError(false);
    setEmailErrorMessage("Incorrect entry");
    setPasswordConfirmation("");
    setPasswordConfirmationError(false);
    setOpenDialogPassword(false);
  };

  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === passwordConfirmation && passwordConfirmation.length >= 4;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (isEmailValid && isPasswordValid && isPasswordConfirmed) {
      const updatedLogin = { password };
      if (email !== user.mail) {
        updatedLogin.mail = email;
      }

      apiAdminUpdateUserById(user.id, updatedLogin)
        .then((res) => {
          if (res.status === 200) {
            setUpdateList(true);
            setAlertAdminMessage("User credentials updated successfully");
            setAlertAdminOpen(true);
            handleClose();
          } else {
            console.error("Cannot update user login");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setEmailError(true);
            setEmailErrorMessage("Email not available");
          } else {
            console.error("error updating user", err);
          }
        });
    }
  };

  return (
    <div>
      <Dialog open={openDialogPassword} onClose={handleClose}>
        <DialogTitle>{`Update credentials for ${user.firstname} ${user.lastname}`}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 3,
            }}
          >
            This action will remove the user's current login information and
            generate new credentials.
          </DialogContentText>

          <TextField
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            placeholder="Please enter your email address"
            value={email}
            error={emailError}
            helperText={emailError ? emailErroressage : null}
            onChange={handleChangeMail}
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: 4,
            }}
          />

          <TextField
            id="password-input"
            label="Password"
            fullWidth
            variant="standard"
            placeholder="Enter your password"
            error={passwordError}
            helperText={passwordError ? "Incorrect entry." : null}
            value={password}
            onChange={handleChangePassword}
            type={showPassword ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: 2,
            }}
          />

          <TextField
            id="password-confirmation-input"
            fullWidth
            variant="standard"
            placeholder="Confirm your password"
            error={passwordConfirmationError}
            helperText={
              passwordConfirmationError
                ? "The passwords entered do not match."
                : null
            }
            value={passwordConfirmation}
            onChange={handleChangePasswordConfirmation}
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirmation}
                    onMouseDown={handleMouseDownPasswordConfirmation}
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogResetPassword.propTypes = {
  openDialogPassword: PropTypes.bool.isRequired,
  setOpenDialogPassword: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mail: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    agency: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    joined_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    position: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
