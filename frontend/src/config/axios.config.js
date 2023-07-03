import axios from "axios";

const Axios = axios.create({
  // Configuration par défaut
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Ou pour le stockage de session
    // const token = sessionStorage.getItem("token");

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
