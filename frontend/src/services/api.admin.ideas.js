import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminIdeas = async () => {
  const route = "/api/admin/ideas/";
  const response = await axios.get(`${url}${route}`);
  return response;
};

const apiAdminArchiveIdea = async (id) => {
  const route = "/api/admin/ideas/archive/";
  const response = await axios.put(`${url}${route}${id}`);
  return response;
};

const apiAdminDeleteIdea = async (id) => {
  const route = "/api/admin/ideas/delete/";
  const response = await axios.put(`${url}${route}${id}`);
  return response;
};

export { apiAdminIdeas, apiAdminArchiveIdea, apiAdminDeleteIdea };
