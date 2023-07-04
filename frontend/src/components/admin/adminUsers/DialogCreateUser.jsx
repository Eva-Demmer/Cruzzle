import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DialogCreateUserSelectAgency from "./DialogCreateUserSelectAgency";
import DialogCreateUserSelectPosition from "./DialogCreateUserSelectPosition";
import { apiAdminCreateUser } from "../../../services/api.admin.users";
// import { apiAdminUpdateUserById } from "../../../services/api.admin.users";

export default function DialogCreateUser({
  openDialogAddUser,
  setOpenDialogAddUser,
  // setUpdateList,
}) {
  // Fields values
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [joinAt, setJoinAt] = useState("");
  const [agency, setAgency] = useState(null);
  const [position, setPosition] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Fiels values validation
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [joinAtError, setJoinAtError] = useState(false);
  const [agencyError, setAgencyError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErroressage, setEmailErrorMessage] = useState("Incorrect entry");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  // Handle values change
  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastname(event.target.value);
  };

  const handleChangeEmail = (event) => {
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

  // Handle form closing
  const handleClose = () => {
    setFirstname("");
    setFirstnameError(false);
    setLastname("");
    setLastnameError(false);
    setJoinAt("");
    setJoinAtError(false);
    setAgency(null);
    setAgencyError(false);
    setPosition(null);
    setPositionError(false);
    setEmail("");
    setEmailError(false);
    setEmailErrorMessage("Incorrect entry");
    setPassword("");
    setPasswordError(false);
    setPasswordConfirmation("");
    setPasswordConfirmationError(false);
    setOpenDialogAddUser(false);
  };

  const handleSubmit = () => {
    const isFirstnameValid = firstname.length >= 2;
    const isLastnameValid = lastname.length >= 2;
    const isJoinAtValid = dayjs(joinAt).isValid();
    const isAgencyValid = typeof agency === "number";
    const isPositionValid = typeof position === "number";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === passwordConfirmation && passwordConfirmation.length >= 4;

    setFirstnameError(!isFirstnameValid);
    setLastnameError(!isLastnameValid);
    setJoinAtError(!isJoinAtValid);
    setAgencyError(!isAgencyValid);
    setPositionError(!isPositionValid);
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (
      isFirstnameValid &&
      isLastnameValid &&
      isJoinAtValid &&
      isAgencyValid &&
      isPositionValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmed
    ) {
      const newUser = {
        mail: email,
        password,
        role_id: 0,
        firstname,
        lastname,
        agency_id: agency,
        joined_at: joinAt,
        position_id: position,
        is_active: true,
      };

      apiAdminCreateUser(newUser)
        .then((res) => {
          if (res.status === 201) {
            handleClose();
          } else if (res.status === 202) {
            setEmailError(true);
            setEmailErrorMessage("Email not available");
          } else {
            console.error("Cannot create user");
          }
        })
        .catch((error) => console.error("Error creating user", error));
    }
  };

  return (
    <Dialog
      open={openDialogAddUser}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add user</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: 4,
          }}
        >
          You are about to add a new user. Please fill in the form below.
        </DialogContentText>

        <TextField
          id="firstname"
          label="Firstname"
          type="text"
          fullWidth
          variant="standard"
          placeholder="Enter an firstname"
          value={firstname}
          error={firstnameError}
          helperText={firstnameError ? "Incorrect entry" : null}
          onChange={handleChangeFirstname}
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 1,
          }}
        />

        <TextField
          id="lasttname"
          label="Lastname"
          type="text"
          fullWidth
          variant="standard"
          placeholder="Enter an lastname"
          value={lastname}
          error={lastnameError}
          helperText={lastnameError ? "Incorrect entry" : null}
          onChange={handleChangeLastName}
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 8,
          }}
        />

        <DateField
          label="Join at"
          onChange={(newDate) =>
            setJoinAt(dayjs(newDate).format("YYYY-MM-DD HH:mm:ss"))
          }
          error={joinAtError}
          helperText={joinAtError ? "required" : null}
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 1,
          }}
        />

        <DialogCreateUserSelectAgency
          setSelectedAgency={setAgency}
          agencyError={agencyError}
        />

        <DialogCreateUserSelectPosition
          setSelectedPosition={setPosition}
          positionError={positionError}
        />

        <TextField
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          placeholder="Enter an email address"
          value={email}
          error={emailError}
          helperText={emailError ? emailErroressage : null}
          onChange={handleChangeEmail}
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 2,
          }}
        />

        <TextField
          id="password-input"
          label="Password"
          fullWidth
          variant="standard"
          placeholder="Enter a password"
          error={passwordError}
          helperText={passwordError ? "Incorrect entry" : null}
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
          placeholder="Confirm the password"
          error={passwordConfirmationError}
          helperText={
            passwordConfirmationError
              ? "The passwords entered do not match"
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
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogCreateUser.propTypes = {
  openDialogAddUser: PropTypes.bool.isRequired,
  setOpenDialogAddUser: PropTypes.func.isRequired,
  // setUpdateList: PropTypes.func.isRequired,
};
