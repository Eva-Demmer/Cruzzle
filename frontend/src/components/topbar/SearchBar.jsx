import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import PropTypes from "prop-types";

function SearchBar({ onSearch, searchRef, setSearch, search }) {
  const handleSearch = () => {
    onSearch();
  };

  return (
    <div>
      <label htmlFor="searchBar" className="hidden">
        Search
      </label>
      <OutlinedInput
        id="searchBar"
        value={search}
        ref={searchRef}
        placeholder="Search something..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              type="button"
              aria-label="search-icon"
              onClick={() => handleSearch()}
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </IconButton>
          </InputAdornment>
        }
        className="rounded-full h-9"
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchBar;
