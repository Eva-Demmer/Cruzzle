import queryString from "query-string";
// import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const serializer = (reqItems) => {
  const encodedParams = queryString.stringify(reqItems);
  return encodedParams;
};

const fetcher = (route, reqItems) => {
  const serializedParams = serializer(reqItems);
  console.info(`${url}${route}?${serializedParams}`);

  //   axios
  //     .get(`${url}${route}?${serializedParams}`)
  //     .then((response) => response.data)
  //     .then(([data]) => {
  //       console.info(data);
  //       return data;
  //     })
  //     .catch((error) => console.error("error from api.services.fetcher", error));
};

export { serializer, fetcher };
