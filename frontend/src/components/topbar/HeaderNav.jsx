import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  Fab,
  IconButton,
  Tooltip,
  Badge,
  Button,
  ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import { BellIcon, GlobeAltIcon, PlusIcon } from "@heroicons/react/24/outline";

import AvatarNavbar from "../avatar/AvatarNavbar";
import HambugerMenu from "./HamburgerMenu";

import LogoMobile from "../../assets/logo/logoMobile.svg";

import { sm } from "../../utils/mediaQueries";

import { UserContext } from "../../contexts/UserContext";
import AccountSettings from "./AccountSettings";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MenuContext } from "../../contexts/MenuContext";
import Progress from "../progressbar/Progress";

function HeaderNav() {
  const { setActiveMenu, activeMenu } = useContext(MenuContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const smallQuery = useMediaQuery(sm);

  const notificationCount = 15; // TODO: add context

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const languages = [
    {
      code: "GB",
      value: "en",
      language: "English",
    },
    {
      code: "FR",
      value: "fr",
      language: "Français",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between py-2 px-4 shadow-2 md:px-6 2xl:px-11 bg-primary-800 sm:bg-white">
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
                zIndex: 2,
              }}
            >
              <PlusIcon className="w-6 h-6" />
            </Fab>
          )}

          {smallQuery && (
            <Button
              variant="contained"
              color="primary"
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
            <>
              <Tooltip title="Langages" className="mx-1">
                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? "language-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Badge
                    badgeContent={language.toUpperCase()}
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "#FFFFFF",
                        backgroundColor: "#7C7C7C",
                      },
                    }}
                  >
                    <GlobeAltIcon className="h-7 w-7" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="language-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {languages.map((item) => (
                  <MenuItem
                    onClick={() => setLanguage(item.value)}
                    key={item.value}
                  >
                    <ListItemIcon>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                    </ListItemIcon>
                    {item.language}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          <Tooltip title="Notifications" className="mx-1">
            <IconButton>
              <Badge badgeContent={notificationCount} color="primary">
                <BellIcon className="h-7 w-7" />
              </Badge>
            </IconButton>
          </Tooltip>

          {smallQuery && <AccountSettings />}

          {!smallQuery && (
            <IconButton
              onClick={() => {
                navigate(`users/${user.id}`);
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
      </div>

      {((!smallQuery && !activeMenu) || smallQuery) && <Progress />}
    </>
  );
}

export default HeaderNav;
