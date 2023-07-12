import { useContext } from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";

export default function FilterbarTrendingFavorites({ isDisable }) {
  const { trendingTag, setTrendingTag } = useContext(FilterFavoritesContext);

  const handleChange = (event) => {
    setTrendingTag(event.target.value);
  };

  return (
    <FormControl disabled={isDisable} className="w-full">
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

FilterbarTrendingFavorites.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
