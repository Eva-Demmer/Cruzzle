import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const fetcher = (route, reqItem) => {
  axios
    .get(`${url}${route}`, reqItem)
    .then((response) => response.data)
    .then(([data]) => {
      console.info(data);
      return data;
    })
    .catch((error) => console.error("error from api.services.fetcher", error));
};

export default fetcher;
