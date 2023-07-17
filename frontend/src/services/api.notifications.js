import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiGetCurrentUserNotificationsIdea = async (id) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.get(`${url}${route}${id}`);
  return response;
};

const apiCreateNotificationsIdea = async (item) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.post(`${url}${route}`, item);
  return response;
};

const apiUpdateNotificationsIdea = async (id, item) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.put(`${url}${route}${id}`, item);
  return response;
};

const apiDeleteOneNotificationIdea = async (id) => {
  const route = "/api/notifications/ideas/";
  const response = await axios.delete(`${url}${route}${id}`);
  return response;
};

const apiDeleteManyNotificationIdea = async (item) => {
  const route = "/api/notifications/ideas/delete";
  const response = await axios.put(`${url}${route}`, item);
  return response;
};

export {
  apiGetCurrentUserNotificationsIdea,
  apiCreateNotificationsIdea,
  apiUpdateNotificationsIdea,
  apiDeleteOneNotificationIdea,
  apiDeleteManyNotificationIdea,
};
