import { useState } from "react";
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

export default function DialogResetPassword({
  openDialogPassword,
  setOpenDialogPassword,
  user,
}) {
  const [updateMail, setUpdateMail] = useState(user.mail);
  const [updatePassword, setUpdatePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeMail = (event) => {
    setUpdateMail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setUpdatePassword(event.target.value);
  };

  const handleClose = () => {
    setOpenDialogPassword(false);
    setUpdatePassword("");
  };

  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(updateMail) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (updatePassword.length <= 3) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (passwordError === false && emailError === false) {
      console.info("youpi");
      // setOpenDialogPassword(false);
    }
  };

  return (
    <div>
      <Dialog open={openDialogPassword} onClose={handleClose}>
        <DialogTitle>{`Reset credentials for ${user.firstname} ${user.lastname}`}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 3,
            }}
          >
            Resetting the credentials will remove the user's current login
            information and generate new credentials.
          </DialogContentText>

          <TextField
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={updateMail}
            error={emailError}
            helperText={emailError ? "Incorrect entry." : null}
            onChange={handleChangeMail}
            sx={{
              marginBottom: 2,
            }}
          />

          <TextField
            id="filled-password-input"
            label="Password"
            fullWidth
            variant="standard"
            error={passwordError}
            helperText={passwordError ? "Incorrect entry." : null}
            value={updatePassword}
            onChange={handleChangePassword}
            type={showPassword ? "text" : "password"}
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
              marginBottom: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
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
};
