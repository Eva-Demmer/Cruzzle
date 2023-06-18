import { useContext } from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarTrending({ isDisable }) {
  const { trendingTag, setTrendingTag } = useContext(FilterContext);

  const handleChange = (event) => {
    setTrendingTag(event.target.value);
  };

  return (
    <FormControl sx={{ width: 155 }} disabled={isDisable}>
      <Select
        id="filter-trending-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={trendingTag}
        onChange={handleChange}
        renderValue={(selected) => {
          const textDict = {
            recent: "recent",
            view: "viewed",
            comment: "commented",
            like: "liked",
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
        <MenuItem value="view">most viewed</MenuItem>
        <MenuItem value="comment">most commented</MenuItem>
        <MenuItem value="like">most liked</MenuItem>
      </Select>
    </FormControl>
  );
}

FilterbarTrending.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
