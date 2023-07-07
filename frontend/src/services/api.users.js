import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/users/";

const apiUsers = async (route = "") => {
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
    // Ajouter la redirection (voir pour une fonction dans service qui prend un param "error" afin d'afficher la page erreur)
  }
};

const apiUsersVerifyPasword = async (data) => {
  const { mail, password } = data;
  try {
    const response = await axios.post(`${url}${userRoute}/verifyPassword`, {
      mail,
      password,
    });

    if (response.status === 200) {
      return response;
    }
    throw new Error(response.status);
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiUsersLogin = async (mail, password) => {
  try {
    const response = await axios.post(`${url}${userRoute}login`, {
      mail,
      password,
    });
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
    // TODO
  }
};

const apiUserById = async (id) => {
  const route = "/api/users/";
  const response = await axios.get(`${url}${route}${id}`);
  return response;
};

const apiUpdateUser = async (id, data) => {
  const route = "/api/users/";
  try {
    const response = await axios.put(`${url}${route}${id}`, data);
    if (response.status === 200) {
      console.info("back", response.data);
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

export {
  apiUsers,
  apiUpdateUser,
  apiUserById,
  apiUsersLogin,
  apiUsersVerifyPasword,
};
