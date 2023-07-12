import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import socket from "../../config/socket.config";
import { UserContext } from "../../contexts/UserContext";

export default function SocketEvents({ setRefresh }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    function onConnect() {
      socket.emit("addUserId", user.id);
    }

    function onNewNotification(notification) {
      console.info(notification);
      setRefresh(true);
    }

    socket.on("connect", onConnect);
    socket.on("new-notification", onNewNotification);

    return () => {
      socket.off("connect", onConnect);
      socket.off("new-notification", onNewNotification);
    };
  }, []);

  return <div />;
}

SocketEvents.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};
