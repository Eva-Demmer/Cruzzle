import { useState, useEffect, useContext } from "react";
import { TextField, IconButton } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

function FilterbarTextSearch() {
  const { setTitleContains } = useContext(FilterContext);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    console.info(event.target.value);
    setValue(event.target.value);
  };

  const handleClearClick = () => {
    setValue("");
  };

  useEffect(() => {
    setTitleContains(value.split(" "));
  }, [value]);

  return (
    <TextField
      id="filter-text-search"
      placeholder="Enter text"
      value={value}
      onChange={handleChange}
      InputProps={{
        sx: { height: 40, width: 270 },
        endAdornment: (
          <IconButton
            onClick={handleClearClick}
            sx={{ visibility: value ? "visible" : "hidden" }}
          >
            <XMarkIcon className="w-4" />
          </IconButton>
        ),
      }}
    />
  );
}

export default FilterbarTextSearch;
