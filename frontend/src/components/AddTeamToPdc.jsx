/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import AddTeamToPdcList from "./AddTeamToPdcList";

export default function AddTeamToPdc({ list, onChange, getOptions }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const optionsData = await getOptions(); // appel axios qui retourne un objet users contenant id, firstname, lastname, imgUrl

      if (active) {
        setOptions([...optionsData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event, value) => {
    onChange(value); // set la valeur de team
  };

  return (
    <div className="list-button flex flex-col items-center w-full gap-4 p-6 sm:flex-row sm:justify-start sm:items-start sm:gap-8">
      <div className="w-full sm:w-1/2 lg:max-w-[400px]">
        <Autocomplete
          multiple
          sx={{ minWidth: 250 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) =>
            option.firstname === value.firstname
          }
          getOptionLabel={(option) => option.firstname}
          options={options}
          value={list}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Gather your team"
              value={list}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </div>
      <div className="w-full sm:w-1/2 lg:max-w-[400px] bg-gray-100">
        <AddTeamToPdcList {...{ list, onChange }} />
      </div>
    </div>
  );
}

AddTeamToPdc.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  getOptions: PropTypes.func.isRequired,
};
