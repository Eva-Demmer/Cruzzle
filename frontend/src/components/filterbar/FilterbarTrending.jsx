import { useContext } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";

import { EyeIcon } from "@heroicons/react/24/outline";

import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarTrending() {
  const { trending, setTrending } = useContext(FilterContext);

  const handleChange = (event) => {
    setTrending(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <Select
        id="filter-trending-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={trending}
        onChange={handleChange}
        renderValue={(selected) => {
          const textDict = {
            recent: "recent",
            views: "viewed",
            comments: "commented",
            likes: "liked",
          };
          return (
            <>
              <EyeIcon className="w-4 mr-2" />
              <span>{textDict[selected]}</span>
            </>
          );
        }}
      >
        <MenuItem value="recent">most recent</MenuItem>
        <MenuItem value="views">most viewed</MenuItem>
        <MenuItem value="comments">most commented</MenuItem>
        <MenuItem value="likes">most liked</MenuItem>
      </Select>
    </FormControl>
  );
}
