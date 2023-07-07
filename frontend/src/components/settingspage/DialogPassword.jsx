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
import { UserContext } from "../../contexts/UserContext";

function DialogPassword({ open, onClose }) {
  const {
    user: { id, mail },
  } = useContext(UserContext);
  const { handleSubmit, control, reset } = useForm();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

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

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((show) => !show);

  const onSubmit = (data) => {
    const { password, confirmPassword, username } = data;

    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === confirmPassword && confirmPassword.length >= 4;

    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (isPasswordValid && isPasswordConfirmed) {
      // Adding logic for
      console.info(username);
      console.info(id);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: 4,
          }}
        >
          To change your password, please enter your new password and confirm it
          below.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue={mail}
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
            name="passwordConfirmation"
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
                autoComplete="new-password" // Ajoutez cette ligne
              />
            )}
          />
        </form>
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
    </Dialog>
  );
}

DialogPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogPassword;
