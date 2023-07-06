import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminPositions = async () => {
  const route = "/api/admin/positions/";
  const response = await axios.get(`${url}${route}`);
  return response;
};

export default apiAdminPositions;
