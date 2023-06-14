import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();

  return <div>{location.state}</div>;
}
export default Search;
