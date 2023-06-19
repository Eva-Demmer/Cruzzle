import { useContext, useEffect } from "react";
import axios from "axios";
import HorizontalScroll from "../scroller/HorizontalScroll";
import FilterBtnAdvanceSearch from "./FilterBtnAdvanceSearch";
import FilterbarDate from "./FilterbarDate";
import FilterbarAutor from "./FilterbarAutor";
import FilterbarCategory from "./FilterbarCategory";
import FilterbarTrending from "./FilterbarTrending";
import FilterPanel from "./FilterPanel";
import { FilterContext } from "../../contexts/FilterContext";

function Filterbar() {
  const {
    filterPanelIsOpen,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  } = useContext(FilterContext);

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const requestBody = {
      publicationDateStart,
      publicationDateEnd,
      autorSelectionTag,
      selectedCategories,
      trendingTag,
      titleContains,
      hasAttachment,
      hasNoComment,
    };

    axios
      .get(`${url}/ideas`, requestBody)
      .then((response) => response.data)
      .then(() => {
        console.info("request sent : ", requestBody);
      })
      .catch((error) => console.error("error from filterbar request", error));
  }, [
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  ]);

  return (
    <div className="filterbar w-full">
      <HorizontalScroll>
        <div className="w-fit min-w-full flex flex-row-reverse items-center lg:block">
          <div className="w-fit my-2 flex justify-end lg:w-full">
            <FilterbarDate isDisable={filterPanelIsOpen} />
          </div>
          <div className="w-full my-2 flex justify-start gap-2 lg:w-full lg:justify-between">
            <FilterBtnAdvanceSearch isDisable={filterPanelIsOpen} />
            <span className="w-36">
              <FilterbarAutor isDisable={filterPanelIsOpen} />
            </span>
            <span className="min-w-40 md:flex-grow">
              <FilterbarCategory isDisable={filterPanelIsOpen} />
            </span>
            <span className="w-40">
              <FilterbarTrending isDisable={filterPanelIsOpen} />
            </span>
          </div>
        </div>
      </HorizontalScroll>
      {filterPanelIsOpen && <FilterPanel />}
    </div>
  );
}

export default Filterbar;
