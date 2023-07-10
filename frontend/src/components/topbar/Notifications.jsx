import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  IconButton,
  Tooltip,
  Badge,
  // ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../contexts/UserContext";
import {
  apiGetCurrentUserNotificationsIdea,
  apiUpdateNotificationsIdea,
} from "../../services/api.notifications";

export default function NotificationsMenu() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationList, setNotificationList] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const open = Boolean(anchorEl);

  const setNotificationAsRed = async (id) => {
    const item = {
      red_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    try {
      const res = await apiUpdateNotificationsIdea(id, item);
      if (res.status === 200) {
        setRefresh(true);
      } else {
        console.error("Cannot set notification as read");
      }
    } catch (error) {
      console.error("Error setting notification as read", error);
    }
  };

  const setNotificationAsNotRed = async (id) => {
    const item = {
      red_at: null,
    };
    try {
      const res = await apiUpdateNotificationsIdea(id, item);
      if (res.status === 200) {
        setRefresh(true);
      } else {
        console.error("Cannot set notification as not read");
      }
    } catch (error) {
      console.error("Error setting notification as not read", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setRefresh(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (id) => () => {
    const not = notificationList.find((item) => item.id === id);
    if (not.red_at === null) {
      setNotificationAsRed(id)
        .then(() => navigate(`/ideas/${id}`))
        .catch((error) => console.error("Error clicking notification", error));
    } else {
      navigate(`/ideas/${id}`);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiGetCurrentUserNotificationsIdea(user.id);
        if (res.status === 200) {
          setNotificationList(res.data);
        } else {
          console.error("Cannot get notifications");
        }
      } catch (error) {
        console.error("Error getting notification", error);
      } finally {
        setRefresh(false);
      }
    };

    fetchNotifications();
  }, [refresh, user.id]);

  useEffect(() => {
    if (notificationList.length > 0) {
      const tot = notificationList.reduce(
        (acc, item) => acc + (item.red_at === null ? 1 : 0),
        0
      );
      setNotificationCount(tot);
    }
  }, [notificationList]);

  return (
    <div className="notification-menu">
      <Tooltip title="notifications" className="mx-1">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={notificationCount} color="primary">
            <BellIcon className="h-7 w-7" />
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
        {notificationList.length > 0 ? (
          notificationList.map((not) => (
            <MenuItem
              key={`noti${not.id}`}
              className={`${not.red_at ? "" : "bg-[#f0e4f5]"}`}
              onClick={handleClickNotification(not.id)}
            >
              {not.type === "like" ? (
                <ChatBubbleBottomCenterIcon className="w-4 h-4 mr-2" />
              ) : (
                <HandThumbUpIcon className="w-4 h-4 mr-2" />
              )}
              {`from ${not.user.firstname} ${not.user.lastname} - ${not.idea.title}`}
              <span className="text-xs text-gray-500 ml-2">{`(${dayjs(
                not.created_at
              ).format("MMM D, h:mm A")})`}</span>

              {not.red_at ? (
                <IconButton
                  className="ml-4"
                  onClick={() => setNotificationAsNotRed(not.id)}
                >
                  <EyeSlashIcon className="w-4 h-4" />
                </IconButton>
              ) : (
                <IconButton
                  className="ml-4"
                  onClick={() => setNotificationAsRed(not.id)}
                >
                  <EyeIcon className="w-4 h-4" />
                </IconButton>
              )}

              <IconButton>
                <TrashIcon className="w-4" />
              </IconButton>
            </MenuItem>
          ))
        ) : (
          <MenuItem>No notification</MenuItem>
        )}
      </Menu>
    </div>
  );
}
