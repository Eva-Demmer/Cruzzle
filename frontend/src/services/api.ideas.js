import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
const ideaRoute = "/api/ideas/";

const apiIdeas = async (route = "") => {
  try {
    const response = await axios.get(`${url}${ideaRoute}${route}`);
    if (response.status === 200) {
      console.info(response.data);
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
    // Ajouter la redirection (voir pour une fonction dans service qui prend un param "error" afin d'afficher la page erreur)
  }
};

const apiUpdateIdeaLike = async (id, data) => {
  try {
    const response = await axios.patch(`${url}${ideaRoute}views/${id}`, {
      views: data,
    });
    if (response.status === 201) {
      console.info(response.data);
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error from apiUpdateLike:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

export { apiIdeas, apiUpdateIdeaLike };
