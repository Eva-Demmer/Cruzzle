import { Link } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { UserIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  Tooltip,
  Menu,
  Avatar,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function AccountSettings() {
  const { firstname, lastname, imgUrl, mail, id } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account Settings" className="mx-1">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ChevronDownIcon className="h-6 w-6" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
        <MenuItem className="pointer-events-none">
          <ListItemIcon>
            <Avatar alt="profil-picture" src={imgUrl} className="w-6 h-6" />
          </ListItemIcon>
          <div>
            <div>{`${firstname} ${lastname}`}</div>
            <div className="text-sm">{mail}</div>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to={`users/${id}`}>
          <ListItemIcon>
            <UserIcon className="h-6 w-6" />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="settings/">
          <ListItemIcon>
            <Cog6ToothIcon className="h-6 w-6" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
export default AccountSettings;
