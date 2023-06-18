import React, { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Fab from "@mui/material/Fab";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

function AddTeamToPdcButton() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleRemove = (person) => {
    const filteredList = personName.filter((name) => name !== person);
    setPersonName(filteredList);
  };

  return (
    <div className="flex flex-col align-centers w-full py-4 md:flex-row md:justify-center bg-slate-500">
      <div className="flex w-full justify-center md:w-1/2 bg-blue-200">
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-multiple-chip-label">Team</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={() => handleRemove(value)}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {users.map((user) => (
              <MenuItem key={user.name} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full md:w-1/2 md:max-w-[450px] bg-red-200">
        <div>
          {personName.map((person) => (
            <ListItem
              key={person}
              className="bg-yellow-300"
              sx={{ height: 64 }}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 40, height: 40 }}
                />
              </ListItemAvatar>
              <ListItemText primary={person} secondary="More infos" />
              <Fab
                color="primary"
                aria-label="add"
                sx={{ width: 40, height: 40 }}
                value={person}
                onClick={() => handleRemove(person)}
              >
                <RemoveIcon sx={{ fontSize: 12 }} />
              </Fab>
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddTeamToPdcButton;
