import { useContext, useEffect } from "react";
import axios from "axios";
import HorizontalScroll from "../scroller/HorizontalScroll";
import FilterBtnAdvanceSearch from "./FilterBtnAdvanceSearch";
import FilterbarDate from "./FilterbarDate";
import FilterbarAutor from "./FilterbarAutor";
import FilterbarCategory from "./FilterbarCategory";
import FilterbarTrending from "./FilterbarTrending";
import { FilterContext } from "../../contexts/FilterContext";

function Filterbar() {
  const {
    publishedBeforeXDaysFromNow,
    publishedAfterXDaysFromNow,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
  } = useContext(FilterContext);

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const requestBody = {
      publishedBeforeXDaysFromNow,
      publishedAfterXDaysFromNow,
      autorSelectionTag,
      selectedCategories,
      trendingTag,
    };

    axios
      .get(`${url}/ideas`, requestBody)
      .then((response) => response.data)
      .then(() => {
        console.info("request sent : ", requestBody);
      })
      .catch((error) => console.error("error from filterbar request", error));
  }, [
    publishedBeforeXDaysFromNow,
    publishedAfterXDaysFromNow,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
  ]);

  return (
    <div className="filterbar w-full">
      <HorizontalScroll>
        <div className="w-fit min-w-full flex flex-row-reverse lg:block">
          <div className="w-fit pt-2 pl-2 flex justify-end lg:w-full">
            <FilterbarDate />
          </div>
          <div className="w-full pt-2 flex justify-start gap-2 lg:w-full lg:justify-between">
            <FilterBtnAdvanceSearch />
            <FilterbarAutor />
            <FilterbarCategory />
            <FilterbarTrending />
          </div>
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default Filterbar;
