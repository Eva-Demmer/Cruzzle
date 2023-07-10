import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
const route = "/api/positions";

const apiPositions = async () => {
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

export default apiPositions;
