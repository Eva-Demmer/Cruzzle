import { useContext } from "react";
import { OutlinedInput, MenuItem, FormControl, Select } from "@mui/material";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

import { IdeaContext } from "../../contexts/IdeaContext";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarCategory() {
  const { categoryList } = useContext(IdeaContext);
  const { selectedCategories, setSelectedCategories } =
    useContext(FilterContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl className="w-80">
        <Select
          id="filter-category-select"
          className="h-10 rounded-full"
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
                  <span>all Categories</span>
                ) : (
                  selected.join(", ")
                )}
              </>
            );
          }}
        >
          {categoryList.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
