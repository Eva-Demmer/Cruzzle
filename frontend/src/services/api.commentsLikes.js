import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/likes/";

const apiGetCommentsLikesByCommentId = async (id) => {
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

const apiDeleteCommentsLikesById = async (id) => {
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

const apiCreateCommentLikes = async (userId, commentId) => {
  const idUser = parseInt(userId, 10);
  const idComment = parseInt(commentId, 10);

  try {
    const response = await axios.post(`${url}${userRoute}`, {
      comment_id: idComment,
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
  apiGetCommentsLikesByCommentId,
  apiDeleteCommentsLikesById,
  apiCreateCommentLikes,
};
