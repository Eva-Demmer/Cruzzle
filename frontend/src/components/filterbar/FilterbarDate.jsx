import { useContext } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";

import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarAutor() {
  const { publishedBeforeXDaysFromNow, setPublishedBeforeXDaysFromNow } =
    useContext(FilterContext);

  const handleChange = (event) => {
    setPublishedBeforeXDaysFromNow(event.target.value);
  };

  return (
    <FormControl className="w-40">
      <Select
        id="filter-date-select"
        className="h-10 rounded-full"
        color="primary"
        value={publishedBeforeXDaysFromNow}
        onChange={handleChange}
      >
        <MenuItem value={30}>last 30 days</MenuItem>
        <MenuItem value={7}>last 7 days</MenuItem>
        <MenuItem value={0}>today</MenuItem>
      </Select>
    </FormControl>
  );
}
