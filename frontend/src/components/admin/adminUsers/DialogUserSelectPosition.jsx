/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiAdminPositions from "../../../services/api.admin.positions";

export default function DialogUserSelectPosition({
  selectedPosition,
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
      value={selectedPosition}
      onChange={(event, newValue) => {
        setSelectedPosition(newValue);
      }}
      options={positionList}
      isOptionEqualToValue={(option, value) => option.id === value.id}
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

DialogUserSelectPosition.propTypes = {
  selectedPosition: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  setSelectedPosition: PropTypes.func.isRequired,
  positionError: PropTypes.bool.isRequired,
};

DialogUserSelectPosition.defaultProps = {
  selectedPosition: PropTypes.shape({
    id: 0,
    name: "",
  }),
};
