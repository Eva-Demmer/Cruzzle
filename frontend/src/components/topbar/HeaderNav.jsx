import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Fab, IconButton, Button } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";

import AvatarNavbar from "../avatar/AvatarNavbar";
import HambugerMenu from "./HamburgerMenu";

import LogoMobile from "../../assets/logo/logoMobile.svg";

import { sm } from "../../utils/mediaQueries";

import { UserContext } from "../../contexts/UserContext";
import AccountSettings from "./AccountSettings";
import { MenuContext } from "../../contexts/MenuContext";
import Progress from "../progressbar/Progress";
import LanguagesMenu from "./Languages";
import NotificationsMenu from "./Notifications";

function HeaderNav() {
  const { user } = useContext(UserContext);
  const { setActiveMenu, activeMenu } = useContext(MenuContext);

  const navigate = useNavigate();
  const smallQuery = useMediaQuery(sm);

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

          {smallQuery && <LanguagesMenu />}

          <NotificationsMenu />

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
