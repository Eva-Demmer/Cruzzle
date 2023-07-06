/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiAdminAgencies from "../../../services/api.admin.agencies";

export default function DialogUserSelectAgency({
  selectedAgency,
  setSelectedAgency,
  agencyError,
}) {
  const [agencyList, setAgencyList] = useState([]);

  useEffect(() => {
    apiAdminAgencies()
      .then((res) => {
        if (res.status === 200) {
          setAgencyList(res.data);
        } else {
          console.error("Cannot get agencies");
        }
      })
      .catch((error) => console.error("Error getting agencies", error));
  }, []);

  return (
    <Autocomplete
      value={selectedAgency}
      onChange={(event, newValue) => {
        setSelectedAgency(newValue);
      }}
      options={agencyList}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(agency) =>
        `${agency.name} - ${agency.city} (${agency.country})`
      }
      renderInput={(params) => (
        <TextField
          {...params}
          error={agencyError}
          helperText={agencyError ? "required" : null}
          variant="standard"
          label="Agency"
          fullWidth
          placeholder="Select an agency"
          InputLabelProps={{ shrink: true }}
        />
      )}
      sx={{
        marginBottom: 1,
      }}
    />
  );
}

DialogUserSelectAgency.propTypes = {
  selectedAgency: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  setSelectedAgency: PropTypes.func.isRequired,
  agencyError: PropTypes.bool.isRequired,
};

DialogUserSelectAgency.defaultProps = {
  selectedAgency: PropTypes.shape({
    id: 0,
    name: "",
    city: "",
    country: "",
  }),
};
