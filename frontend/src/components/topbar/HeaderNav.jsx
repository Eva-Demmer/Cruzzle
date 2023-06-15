import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Fab, IconButton, Tooltip, Badge, Button } from "@mui/material";
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
import AccountSettings from "./AccountSettings";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MenuContext } from "../../contexts/MenuContext";

function HeaderNav() {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const { setActiveMenu } = useContext(MenuContext);
  const { language } = useContext(LanguageContext);

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
            <div>
              <SearchBar
                onSearch={handleSearch}
                searchRef={searchRef}
                search={search}
                setSearch={setSearch}
              />
            </div>
          )}

          <div className="mx-2">
            {!smallQuery && (
              <IconButton
                type="button"
                aria-label="logo-icon"
                onClick={() => {
                  navigate("/");
                  setActiveMenu(false);
                }}
              >
                <img className="w-8 h-8" src={LogoMobile} alt="logo cruzzle" />
              </IconButton>
            )}
          </div>
          <div className="flex flex-1 items-center justify-around mx-2 sm:flex-none">
            {!smallQuery && (
              <>
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
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PlusIcon className="h-6 w-6" />}
                className="flex rounded-full mx-2"
                onClick={() => navigate("/ideas/new")}
                sx={{
                  boxShadow: 1,
                  "&:hover": { boxShadow: 2 },
                  "&:active, &.Mui-focusVisible": { boxShadow: 4 },
                }}
              >
                Cruzzle
              </Button>
            )}

            {smallQuery && (
              <Tooltip title="Langages" className="mx-1">
                <IconButton>
                  <Badge
                    badgeContent={language}
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "#717171",
                      },
                    }}
                  >
                    <GlobeAltIcon className="h-7 w-7" />
                  </Badge>
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

            {smallQuery && <AccountSettings />}

            {!smallQuery && (
              <IconButton
                onClick={() => {
                  navigate(`users/${id}`);
                  setActiveMenu(false);
                }}
              >
                <AvatarNavbar />
              </IconButton>
            )}
          </div>

          {!smallQuery && (
            <div className="mx-2">
              <HambugerMenu />
            </div>
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

export default HeaderNav;
