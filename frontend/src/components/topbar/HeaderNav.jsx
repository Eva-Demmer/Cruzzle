import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { Fab, IconButton, Tooltip, Badge } from "@mui/material";
import {
  ArrowLeftIcon,
  BellIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import SearchBar from "./SearchBar";
import AvatarNavbar from "../avatar/AvatarNavbar";
import HambugerMenu from "./HamburgerMenu";

import LogoMobile from "../../assets/logo/logoMobile.svg";

import { sm } from "../../utils/mediaQueries";

import { UserContext } from "../../contexts/UserContext";

function HeaderNav({ activeMenu, setActiveMenu }) {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const { id } = useContext(UserContext);

  const searchRef = useRef();
  const navigate = useNavigate();
  const smallQuery = useMediaQuery(sm);

  const notificationCount = 15; // TODO: add context

  const handleSearch = () => {
    if (search !== "") {
      if (!smallQuery) {
        setOpenSearch(false);
      }
      setActiveMenu(false);
      navigate("/search", { state: search });
    }
  };

  return (
    <div className="flex items-center min-h-[64px] px-4 py-2 justify-between bg-primary-900 bg-opacity-5 sm:bg-white">
      {!openSearch && (
        <>
          {smallQuery && (
            <SearchBar
              onSearch={handleSearch}
              searchRef={searchRef}
              search={search}
              setSearch={setSearch}
            />
          )}
          {!smallQuery && (
            <>
              <IconButton
                type="button"
                aria-label="search-icon"
                onClick={() => {
                  navigate("/");
                  setActiveMenu(false);
                }}
              >
                <img className="w-8 h-8" src={LogoMobile} alt="logo cruzzle" />
              </IconButton>
              <IconButton
                type="button"
                aria-label="search-icon"
                onClick={() => setOpenSearch(true)}
              >
                <MagnifyingGlassIcon className="h-7 w-7" />
              </IconButton>
              <Fab
                color="primary"
                aria-label="add"
                className="h-9 w-9"
                onClick={() => {
                  navigate("/ideas/new");
                  setActiveMenu(false);
                }}
                sx={{
                  boxShadow: 1,
                  "&:hover": { boxShadow: 2 },
                  "&:active, &.Mui-focusVisible": { boxShadow: 4 },
                }}
              >
                <PlusIcon className="w-6 h-6" />
              </Fab>
            </>
          )}

          {smallQuery && (
            <Tooltip title="Langages" className="mx-1">
              <IconButton>
                <GlobeAltIcon className="h-7 w-7" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Notifications" className="mx-1">
            <IconButton>
              <Badge badgeContent={notificationCount} color="secondary">
                <BellIcon className="h-7 w-7" />
              </Badge>
            </IconButton>
          </Tooltip>

          {!smallQuery && (
            <>
              <IconButton
                onClick={() => {
                  navigate(`users/${id}`);
                  setActiveMenu(false);
                }}
              >
                <AvatarNavbar />
              </IconButton>
              <HambugerMenu
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
              />
            </>
          )}
        </>
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

HeaderNav.propTypes = {
  activeMenu: PropTypes.bool.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
};

export default HeaderNav;
