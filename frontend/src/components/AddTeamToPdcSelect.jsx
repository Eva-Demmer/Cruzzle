import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AddTeamToPdcSelec() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  // const [team, setTeam] = useState([]);

  const users = [
    {
      name: "Oliver Hansen",
      image: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    {
      name: "April Tucker",
      image: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    {
      name: "Ralph Hubbard",
      image: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    {
      name: "Bradley Wilkerson",
      image: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    {
      name: "Kelly Snyder",
      image: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
  ];

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...users]);
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

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   console.log(value);
  // };

  return (
    <Autocomplete
      multiple
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      // value={team}
      loading={loading}
      renderInput={(params) => (
        <TextField
          // {...params}
          label="Create the team"
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
  );
}
