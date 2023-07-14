import { useContext, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";

function FilterbarTextSearchFavorites() {
  const { setTitleContains } = useContext(FilterFavoritesContext);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setTitleContains(value);
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setValue("");
    setTitleContains(null);
  };

  return (
    <TextField
      id="filter-text-search"
      placeholder="search by key words..."
      value={value}
      onChange={handleChange}
      onBlur={handleSubmit}
      onKeyDown={handleKeydown}
      InputProps={{
        sx: { height: 40, width: 270 },
        endAdornment: (
          <>
            <IconButton
              onClick={handleSubmit}
              sx={{ visibility: value ? "visible" : "hidden" }}
            >
              <CheckIcon className="w-4" />
            </IconButton>
            {value && <span className="text-gray-400">|</span>}
            <IconButton
              onClick={handleClear}
              sx={{ visibility: value ? "visible" : "hidden" }}
            >
              <XMarkIcon className="w-4" />
            </IconButton>
          </>
        ),
      }}
    />
  );
}

export default FilterbarTextSearchFavorites;
