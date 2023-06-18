import { useContext } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";
import { PencilIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterAutor() {
  const { filterPanelIsOpen, autorSelectionTag, setAutorSelectionTag } =
    useContext(FilterContext);

  const handleChange = (event) => {
    setAutorSelectionTag(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} disabled={filterPanelIsOpen}>
      <Select
        id="filter-autor-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={autorSelectionTag}
        onChange={handleChange}
        renderValue={(value) => {
          const textDict = {
            all: "all autors",
            currentUserAgency: "my agency",
            currentUser: "me",
          };
          return (
            <>
              <PencilIcon className="w-4 mr-2" />
              <span>{textDict[value]}</span>
            </>
          );
        }}
      >
        <MenuItem value="all">all autors</MenuItem>
        <MenuItem value="currentUserAgency">my agency</MenuItem>
        <MenuItem value="currentUser">me</MenuItem>
      </Select>
    </FormControl>
  );
}
