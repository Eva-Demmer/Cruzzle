import { IconButton } from "@mui/material";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SearchBar from "./SearchBar";
import { sm } from "../../utils/mediaQueries";

function HeaderNav() {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef();

  const navigate = useNavigate();

  const smallQuery = useMediaQuery(sm);

  const handleSearch = () => {
    if (!smallQuery) {
      setOpenSearch(false);
    }
    navigate("/search", { state: search });
  };

  return (
    <div className="flex items-center px-6 py-4 justify-between bg-white">
      {smallQuery && (
        <SearchBar
          onSearch={handleSearch}
          searchRef={searchRef}
          search={search}
          setSearch={setSearch}
        />
      )}
      {!smallQuery && !openSearch && (
        <IconButton
          type="button"
          aria-label="search-icon"
          onClick={() => setOpenSearch(true)}
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </IconButton>
      )}
      {!smallQuery && openSearch && (
        <>
          <IconButton
            type="button"
            aria-label="search-icon"
            onClick={() => setOpenSearch(false)}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <div className="w-full flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              searchRef={searchRef}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default HeaderNav;
