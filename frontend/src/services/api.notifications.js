import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiGetCurrentUserNotificationsIdea = async (id) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.get(`${url}${route}${id}`);
  return response;
};

const apiUpdateNotificationsIdea = async (id, item) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.put(`${url}${route}${id}`, item);
  return response;
};

const apiDeleteNotificationIdea = async (id) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.delete(`${url}${route}${id}`);
  return response;
};

export {
  apiGetCurrentUserNotificationsIdea,
  apiUpdateNotificationsIdea,
  apiDeleteNotificationIdea,
};
