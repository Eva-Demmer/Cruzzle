import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminUsers = async () => {
  const route = "/api/admin/users/";
  const response = await axios.get(`${url}${route}`);
  return response;
};

const apiAdminUpdateUserById = async (id, updatedUser) => {
  const route = "/api/admin/users/";
  const response = await axios.put(`${url}${route}${id}`, updatedUser);
  return response;
};

export { apiAdminUsers, apiAdminUpdateUserById };
