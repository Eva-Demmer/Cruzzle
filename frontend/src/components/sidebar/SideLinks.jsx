import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  HomeIcon,
  LightBulbIcon,
  StarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Collapse from "@mui/material/Collapse";
import LogoutLinks from "./LogoutLinks";
import { MenuContext } from "../../contexts/MenuContext";

function SideLinks() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const isAdmin = false; // TODO: add to context

  const iconSize = (item) => {
    return `h-6 w-6 ${location.pathname === item.to ? "text-primary-50" : ""}`;
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleGoTo = () => {
    setActiveMenu(!activeMenu);
  };

  const navlinks = [
    {
      to: "/dashboard",
      primary: "Home",
      icon: HomeIcon,
    },
    {
      to: "/ideas",
      primary: "Ideas",
      icon: LightBulbIcon,
    },
    {
      to: "/favorits",
      primary: "Favorits",
      icon: StarIcon,
    },
    {
      to: "/users",
      primary: "Community",
      icon: UserGroupIcon,
    },
    {
      primary: "Pannel Admin",
      icon: WrenchScrewdriverIcon,
      admin: true,
      subLink: [
        {
          to: "/admin/users",
          primary: "Users",
        },
        {
          to: "/admin/ideas",
          primary: "Ideas",
        },
      ],
    },
    {
      to: "/settings",
      primary: "Settings",
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <div className="flex flex-col flex-1 mt-12 w-full">
      <List
        sx={{
          width: "100%",
          bgcolor: "background.transparent",
        }}
        component="nav"
      >
        {navlinks.map((item) => {
          return (
            <React.Fragment key={item.primary}>
              {((!item.subLink && !item.admin) ||
                (!item.subLink && item.admin && isAdmin)) && (
                <ListItemButton
                  key={item.primary}
                  component={Link}
                  to={item.to}
                  onClick={() => handleGoTo}
                  className={`w-full ${
                    location.pathname === item.to
                      ? "Mui-selected text-primary-50"
                      : ""
                  }`}
                >
                  <ListItemIcon>
                    <item.icon className={iconSize(item)} />
                  </ListItemIcon>
                  <ListItemText primary={item.primary} />
                </ListItemButton>
              )}
              {((item.subLink && !item.admin) ||
                (item.subLink && item.admin && isAdmin)) && (
                <React.Fragment key={item.primary}>
                  <ListItemButton onClick={handleClick} className="w-full">
                    <ListItemIcon>
                      <item.icon className={iconSize(item)} />
                    </ListItemIcon>
                    <ListItemText primary={item.primary} />
                    {open ? (
                      <ChevronUpIcon className={iconSize(item)} />
                    ) : (
                      <ChevronDownIcon className={iconSize(item)} />
                    )}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subLink?.map((subitem) => (
                        <ListItemButton
                          sx={{ pl: 8 }}
                          key={`subitem ${subitem.to}`}
                          component={Link}
                          to={subitem.to || ""}
                          className={` ${
                            location.pathname === subitem.to
                              ? "Mui-selected text-primary-50"
                              : ""
                          }`}
                        >
                          <ListItemText primary={subitem.primary} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
        <LogoutLinks />
      </List>
    </div>
  );
}
export default SideLinks;
