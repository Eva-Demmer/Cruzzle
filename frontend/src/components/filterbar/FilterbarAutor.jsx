import { useState } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";

import { PencilIcon } from "@heroicons/react/24/outline";

export default function FilterAutor() {
  const [autorFilterValue, setAutorFilterValue] = useState("writenByAll");

  const handleChange = (event) => {
    setAutorFilterValue(event.target.value);
  };

  return (
    <FormControl className="w-40">
      <Select
        id="filter-autor-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={autorFilterValue}
        onChange={handleChange}
        renderValue={(value) => {
          const textDict = {
            writenByAll: "all autors",
            writenByMyAgency: "my agency",
            writenByMe: "me",
          };
          return (
            <>
              <PencilIcon className="w-4 mr-2" />
              <span>{textDict[value]}</span>
            </>
          );
        }}
      >
        <MenuItem value="writenByAll">all autors</MenuItem>
        <MenuItem value="writenByMyAgency">my agency</MenuItem>
        <MenuItem value="writenByMe">me</MenuItem>
      </Select>
    </FormControl>
  );
}
