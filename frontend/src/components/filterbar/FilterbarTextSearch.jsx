import { useContext } from "react";
import { TextField, IconButton } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

function FilterbarTextSearch() {
  const { titleContains, setTitleContains } = useContext(FilterContext);

  const handleChange = (event) => {
    console.info(event.target.value);
    setTitleContains(event.target.value);
  };

  const handleClearClick = () => {
    setTitleContains("");
  };

  return (
    <TextField
      id="filter-text-search"
      placeholder="search by key words..."
      value={titleContains}
      onChange={handleChange}
      InputProps={{
        sx: { height: 40, width: 270 },
        endAdornment: (
          <IconButton
            onClick={handleClearClick}
            sx={{ visibility: titleContains ? "visible" : "hidden" }}
          >
            <XMarkIcon className="w-4" />
          </IconButton>
        ),
      }}
    />
  );
}

export default FilterbarTextSearch;
