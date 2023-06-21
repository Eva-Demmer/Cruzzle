import qs from "qs";
// import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const serializer = (reqItems) => {
  const encodedParams = qs.stringify(reqItems, {
    skipNulls: true,
  });
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
