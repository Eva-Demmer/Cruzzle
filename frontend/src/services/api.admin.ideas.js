import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminIdeas = async (route = "") => {
  const userRoute = "/api/admin/ideas/";
  try {
    const response = await axios.get(`${url}${userRoute}${route}`);
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

const apiAdminArchiveIdea = async (id) => {
  const userRoute = "/api/admin/ideas/archive/";

  try {
    const response = await axios.put(`${url}${userRoute}${id}`);
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

const apiAdminDeleteIdea = async (id) => {
  const userRoute = "/api/admin/ideas/delete/";
  try {
    const response = await axios.put(`${url}${userRoute}${id}`);
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

export { apiAdminIdeas, apiAdminArchiveIdea, apiAdminDeleteIdea };
