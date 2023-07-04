import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminRoles = async () => {
  const route = "/api/admin/roles/";
  const response = await axios.get(`${url}${route}`);
  return response;
};

export default apiAdminRoles;
