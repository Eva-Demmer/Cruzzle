/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiAdminAgencies from "../../../services/api.admin.agencies";

export default function DialogCreateUserSelectAgency({
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
      onChange={(event, newValue) => {
        setSelectedAgency(newValue ? newValue.id : null);
      }}
      options={agencyList}
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

DialogCreateUserSelectAgency.propTypes = {
  setSelectedAgency: PropTypes.func.isRequired,
  agencyError: PropTypes.bool.isRequired,
};
