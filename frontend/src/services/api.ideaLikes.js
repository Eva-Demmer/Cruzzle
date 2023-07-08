import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/ideas/likes/";

const apiGetIdeaLikesByIdeaId = async (id) => {
  try {
    const response = await axios.get(`${url}${userRoute}${id}`);
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
  }
};

const apiGetTotalLikesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${url}${userRoute}/users/${userId}`);
    if (response.status === 200) {
      console.info(response.data);
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch error:", error);
    }
    throw error;
  }
};

const apiDeleteIdeaLikesById = async (id) => {
  try {
    const response = await axios.delete(`${url}${userRoute}/${id}`);
    if (response.status === 204) {
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
  }
};

const apiCreateIdeaLikes = async (userId, ideaId) => {
  const idUser = parseInt(userId, 10);
  const idIdea = parseInt(ideaId, 10);

  try {
    const response = await axios.post(`${url}${userRoute}`, {
      idea_id: idIdea,
      user_id: idUser,
    });
    if (response.status === 201) {
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
  }
};

export {
  apiGetIdeaLikesByIdeaId,
  apiGetTotalLikesByUserId,
  apiDeleteIdeaLikesById,
  apiCreateIdeaLikes,
};
