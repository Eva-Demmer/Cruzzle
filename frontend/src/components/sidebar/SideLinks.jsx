import React, { useState } from "react";
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

function SideLinks() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const iconSize = (item) => {
    return `h-6 w-6 ${location.pathname === item.to ? "text-amber-100" : ""}`;
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const navlinks = [
    {
      to: "/",
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
    <div className="flex flex-col flex-1 mt-12">
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.transparent",
        }}
        component="nav"
      >
        {navlinks.map((item) =>
          item.to ? (
            <ListItemButton
              key={item.primary}
              component={Link}
              to={item.to}
              className={`${
                location.pathname === item.to
                  ? "Mui-selected text-amber-100"
                  : ""
              }`}
            >
              <ListItemIcon>
                <item.icon className={iconSize(item)} />
              </ListItemIcon>
              <ListItemText primary={item.primary} />
            </ListItemButton>
          ) : (
            <React.Fragment key={item.primary}>
              <ListItemButton onClick={handleClick} className="">
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
                        location.pathname === subitem.to ? "Mui-selected" : ""
                      }`}
                    >
                      <ListItemText primary={subitem.primary} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          )
        )}
      </List>
    </div>
  );
}
export default SideLinks;
