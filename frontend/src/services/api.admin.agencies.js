import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminAgencies = async () => {
  const route = "/api/admin/agencies/";
  const response = await axios.get(`${url}${route}`);
  return response;
};

export default apiAdminAgencies;
