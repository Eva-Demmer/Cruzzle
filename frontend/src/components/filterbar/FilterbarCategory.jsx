import { useContext } from "react";
import { OutlinedInput, MenuItem, FormControl, Select } from "@mui/material";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { IdeaContext } from "../../contexts/IdeaContext";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarCategory() {
  const { categoryList } = useContext(IdeaContext);
  const { filterPanelIsOpen, selectedCategories, setSelectedCategories } =
    useContext(FilterContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl
        sx={{ width: [200, 200, 250, 350] }}
        disabled={filterPanelIsOpen}
      >
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
                  selected.map((id) => categoryList[id].name).join(", ")
                )}
              </>
            );
          }}
        >
          {categoryList.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
