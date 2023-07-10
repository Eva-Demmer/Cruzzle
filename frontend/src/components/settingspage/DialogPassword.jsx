import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { apiUsersUpdatePasword } from "../../services/api.users";
import { Axios } from "../../config/axios.config";
import AlertOnSave from "../createidea/AlertOnSave";

function DialogPassword({ open, onClose }) {
  const { user } = useContext(UserContext);
  const { handleSubmit, control, reset } = useForm();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);
  const [alert, setAlert] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const handleClose = () => {
    setPasswordError(false);
    setPasswordConfirmationError(false);
    reset();
    onClose();
  };

  const successUpdatePassword = () => {
    localStorage.removeItem("token");
    delete Axios.defaults.headers.common.Authorization;
    navigate("/login");
  };

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((show) => !show);

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === confirmPassword && confirmPassword.length >= 4;

    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (isPasswordValid && isPasswordConfirmed) {
      const userData = {
        id: user.id,
        password,
      };

      try {
        const response = await apiUsersUpdatePasword(userData);
        if (response.status === 200) {
          setAlert({
            title: "Password updated",
            message: "Password was updated successfully",
            severity: "success",
          });
        } else {
          setAlert({
            title: "Error",
            message: "Password was not updated",
            severity: "error",
          });
        }
        setOpenAlert(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText
              sx={{
                marginBottom: 4,
              }}
            >
              To change your password, please enter your new password and
              confirm it below.
            </DialogContentText>

            <Controller
              name="username"
              control={control}
              defaultValue={user.mail}
              render={({ field: { value } }) => (
                <div style={{ display: "none" }}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    placeholder="Enter your username"
                    value={value}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginBottom: 4,
                    }}
                    autoComplete="your email"
                  />
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="password-input"
                  fullWidth
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your password"
                  error={passwordError}
                  helperText={passwordError ? "Incorrect entry." : null}
                  value={value}
                  onChange={onChange}
                  onFocus={() => setShowPasswordConfirmation(false)}
                  onBlur={() => setShowPassword(false)}
                  type={showPassword ? "text" : "password"}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    marginBottom: 4,
                  }}
                  autoComplete="new-password"
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="password-confirmation-input"
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  placeholder="Confirm your password"
                  error={passwordConfirmationError}
                  helperText={
                    passwordConfirmationError
                      ? "The passwords entered do not match."
                      : null
                  }
                  value={value}
                  onChange={onChange}
                  onFocus={() => setShowPassword(false)}
                  onBlur={() => setShowPasswordConfirmation(false)}
                  type={showPasswordConfirmation ? "text" : "password"}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirmation}
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
                  autoComplete="new-password"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                boxShadow: 1,
                "&:hover": { boxShadow: 2 },
                "&:active, &.Mui-focusVisible": { boxShadow: 4 },
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {alert && (
        <AlertOnSave
          open={openAlert}
          setOpen={setOpenAlert}
          message={alert.message}
          title={alert.title}
          severity={alert.severity}
          onClose={
            alert.severity === "success"
              ? () => successUpdatePassword()
              : () => handleClose()
          }
        />
      )}
    </>
  );
}

DialogPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogPassword;
