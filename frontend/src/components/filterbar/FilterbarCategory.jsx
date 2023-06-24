import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { OutlinedInput, MenuItem, FormControl, Select } from "@mui/material";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { IdeaContext } from "../../contexts/IdeaContext";
import { FilterContext } from "../../contexts/FilterContext";
import { fetchAll } from "../../services/api.services";

export default function FilterbarCategory({ isDisable }) {
  const { categoryList, setCategoryList } = useContext(IdeaContext);
  const { selectedCategories, setSelectedCategories } =
    useContext(FilterContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetchAll("/api/categories")
      .then((data) => setCategoryList(data))
      .catch((error) =>
        console.error("error from api.services.fetcher", error)
      );
  }, []);

  return (
    <FormControl disabled={isDisable} className="w-full">
      <Select
        id="filter-category-select"
        className="h-10 w-full rounded-full"
        multiple
        displayEmpty
        value={selectedCategories}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          return (
            <>
              <Square3Stack3DIcon className="w-4 mr-2" />
              {selected.length === 0 ? (
                <span>all categories</span>
              ) : (
                selected.map((id) => categoryList[id].label).join(", ")
              )}
            </>
          );
        }}
      >
        {categoryList.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FilterbarCategory.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
