import qs from "qs";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const serializer = (reqItems) => {
  const encodedParams = qs.stringify(reqItems, {
    skipNulls: true,
  });
  return encodedParams;
};

const fetchAll = async (route) => {
  return axios
    .get(`${url}${route}`)
    .then((response) => response.data)
    .catch((error) => console.error("error from api.services.fetcher", error));
};

const fetchByQuery = async (route, reqItems) => {
  const serializedParams = serializer(reqItems);

  return axios
    .get(`${url}${route}?${serializedParams}`)
    .then((response) => response.data)
    .catch((error) =>
      console.error("error from api.services.fetcherWithQuery", error)
    );
};

export { fetchAll, fetchByQuery };
