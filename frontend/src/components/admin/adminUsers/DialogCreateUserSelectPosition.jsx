/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiAdminPositions from "../../../services/api.admin.positions";

export default function DialogCreateUserSelectPosition({
  setSelectedPosition,
  positionError,
}) {
  const [positionList, setPositionList] = useState([]);

  useEffect(() => {
    apiAdminPositions()
      .then((res) => {
        if (res.status === 200) {
          setPositionList(res.data);
        } else {
          console.error("Cannot get positions");
        }
      })
      .catch((error) => console.error("Error getting positions", error));
  }, []);

  return (
    <Autocomplete
      // value={selectedAgency}
      onChange={(event, newValue) => {
        setSelectedPosition(newValue ? newValue.id : null);
      }}
      options={positionList}
      getOptionLabel={(position) => position.name}
      renderInput={(params) => (
        <TextField
          {...params}
          error={positionError}
          helperText={positionError ? "required" : null}
          variant="standard"
          label="Position"
          fullWidth
          placeholder="Select a position"
          InputLabelProps={{ shrink: true }}
        />
      )}
      sx={{
        marginBottom: 8,
      }}
    />
  );
}

DialogCreateUserSelectPosition.propTypes = {
  setSelectedPosition: PropTypes.func.isRequired,
  positionError: PropTypes.bool.isRequired,
};
