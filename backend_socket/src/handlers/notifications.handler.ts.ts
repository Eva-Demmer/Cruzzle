import { RowDataPacket } from "mysql2";
import database from "../config/database";
import Notification from "../interfaces/notifications";

let notificationInterval: NodeJS.Timeout | null = null;

const handleNotification = async () => {
  try {
    const [data] = await database.query<RowDataPacket[]>(
      "SELECT n.id AS notification_id, n.type AS notification_type, i.user_id AS idea_author_id FROM notification_idea AS n INNER JOIN idea AS i ON i.id = n.idea_id ORDER BY n.created_at DESC LIMIT 1",
      []
    );

    console.info(data[0]);
    return data[0] as Notification;
  } catch (err) {
    console.error("Error retrieving data from database", err);
    throw err; // Re-throw the error to be handled in the caller
  }
};

let previousNotificationId: number | null = null;

const compareLastNotification = async () => {
  let isNewNotification = false;
  try {
    const notification: Notification = await handleNotification();
    const { notification_id: notificationId } = notification;

    if (notificationId !== previousNotificationId) {
      console.info("Notification ID changed:", notificationId);
      previousNotificationId = notificationId;
      isNewNotification = true;
    } else {
      console.info("Notification ID is the same:", notificationId);
      isNewNotification = false;
    }
    return [isNewNotification, notification];
  } catch (err) {
    console.error("Error comparing notifications", err);
    throw err;
  }
};

const listenerNotificationByInterval = (
  callback: (isNewNotification: (boolean | Notification)[]) => void
) => {
  notificationInterval = setInterval(async () => {
    const isNewNotification = await compareLastNotification();
    callback(isNewNotification);
  }, 5000);
};

const stoplistenerNotificationByInterval = () => {
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
  }
};

export {
  handleNotification,
  listenerNotificationByInterval,
  stoplistenerNotificationByInterval,
};
