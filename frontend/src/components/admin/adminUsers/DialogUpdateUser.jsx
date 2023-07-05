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
import DialogUserSelectAgency from "./DialogUserSelectAgency";
import DialogUserSelectPosition from "./DialogUserSelectPosition";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";

export default function DialogUpdateUser({
  user,
  openDialogUpdateUser,
  setOpenDialogUpdateUser,
  setUpdateList,
}) {
  // Fields values
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [joinAt, setJoinAt] = useState(user.joined_at);
  const [agency, setAgency] = useState(user.agency);
  const [position, setPosition] = useState(user.position);

  // Fiels values validation
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [joinAtError, setJoinAtError] = useState(false);
  const [agencyError, setAgencyError] = useState(false);
  const [positionError, setPositionError] = useState(false);

  // Handle values change
  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastname(event.target.value);
  };

  // Handle form closing
  const handleClose = () => {
    setFirstnameError(false);
    setLastnameError(false);
    setJoinAtError(false);
    setAgencyError(false);
    setPositionError(false);
    setOpenDialogUpdateUser(false);
  };

  const handleSubmit = async () => {
    const isFirstnameValid = firstname.length >= 2;
    const isLastnameValid = lastname.length >= 2;
    const isJoinAtValid = dayjs(joinAt).isValid();
    const isAgencyValid = typeof agency.id === "number";
    const isPositionValid = typeof position.id === "number";

    setFirstnameError(!isFirstnameValid);
    setLastnameError(!isLastnameValid);
    setJoinAtError(!isJoinAtValid);
    setAgencyError(!isAgencyValid);
    setPositionError(!isPositionValid);

    if (
      isFirstnameValid &&
      isLastnameValid &&
      isJoinAtValid &&
      isAgencyValid &&
      isPositionValid
    ) {
      const updatedUser = {
        firstname,
        lastname,
        agency_id: agency.id,
        joined_at: joinAt,
        position_id: position.id,
      };

      apiAdminUpdateUserById(user.id, updatedUser)
        .then((res) => {
          if (res.status === 200) {
            setUpdateList(true);
            handleClose();
          } else {
            console.error("Cannot update user");
          }
        })
        .catch((err) => {
          console.error("error updating user", err);
        });
    }
  };

  return (
    <Dialog
      open={openDialogUpdateUser}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{`Update user ${user.firstname} ${user.lastname}`}</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: 4,
          }}
        >
          {`You are about to edit ${user.firstname} ${user.lastname}'s informations. Please fill in the form below.`}
        </DialogContentText>

        <TextField
          id="firstname"
          label="Firstname"
          type="text"
          fullWidth
          variant="standard"
          placeholder="Enter a firstname"
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
          id="lastname"
          label="Lastname"
          type="text"
          fullWidth
          variant="standard"
          placeholder="Enter a lastname"
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
          value={dayjs(joinAt)}
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

        <DialogUserSelectAgency
          user={user}
          selectedAgency={agency}
          setSelectedAgency={setAgency}
          agencyError={agencyError}
        />

        <DialogUserSelectPosition
          user={user}
          selectedPosition={position}
          setSelectedPosition={setPosition}
          positionError={positionError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogUpdateUser.propTypes = {
  openDialogUpdateUser: PropTypes.bool.isRequired,
  setOpenDialogUpdateUser: PropTypes.func.isRequired,
  setUpdateList: PropTypes.func.isRequired,
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
