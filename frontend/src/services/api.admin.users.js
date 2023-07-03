import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminUsers = async () => {
  const route = "/api/admin/users/";
  try {
    const response = await axios.get(`${url}${route}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

const apiAdminActiveUser = async (id) => {
  const route = "/api/admin/users/active/";

  try {
    const response = await axios.put(`${url}${route}${id}`);
    if (response.status === 200) {
      return response;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Update  error:", error);
    }
    throw error;
  }
};

export { apiAdminUsers, apiAdminActiveUser };
