import { useContext } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FormControlLabel, Checkbox, Button } from "@mui/material";
import FilterbarCategoryFavorites from "./FilterbarCategoryFavorites";
import FilterbarAutorFavorites from "./FilterbarAutorFavorites";
import FilterbarTrendingFavorites from "./FilterbarTrendingFavorites";
import FilterbarTextSearchFavorites from "./FilterbarTextSearchFavorites";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";
import FilterbarDatePickerFavorites from "./FilterbarDatePickerFavorites";

function FilterPanelFavorites() {
  const {
    setDateDelta,
    filterPanelIsOpen,
    setFilterPanelIsOpen,
    hasAttachment,
    setHasAttachment,
    hasNoComment,
    setHasNoComment,
    setPublicationDateStart,
    setPublicationDateEnd,
    setAutorSelectionTag,
    setSelectedCategories,
    setTrendingTag,
    setTitleContains,
  } = useContext(FilterFavoritesContext);

  const handleClickReset = () => {
    setDateDelta(30);
    setPublicationDateStart(
      dayjs().locale("fr").subtract(30, "day").format("YYYY-MM-DD HH:mm:ss")
    );
    setPublicationDateEnd(dayjs().locale("fr").format("YYYY-MM-DD HH:mm:ss"));
    setAutorSelectionTag("all");
    setSelectedCategories([]);
    setTrendingTag("recent");
    setTitleContains([]);
    setHasAttachment(false);
    setHasNoComment(false);
  };

  return (
    <div className="filter-panel h-screen w-screen md:w-80 fixed z-50 top-0 right-0 py-12 px-6 flex flex-col gap-2 md:gap-6 border-solid border-gray-300 border-t-[0px] border-b-[0px] border-r-[0px] border-l-[1px] bg-white">
      <h4>Filters</h4>
      <FilterbarCategoryFavorites isDisable={!filterPanelIsOpen} />
      <FilterbarAutorFavorites isDisable={!filterPanelIsOpen} />
      <FilterbarTrendingFavorites isDisable={!filterPanelIsOpen} />

      <div className="filter-panel-box ml-3">
        <FormControlLabel
          control={<Checkbox checked={hasAttachment} />}
          label="Contains attachments"
          onChange={() => setHasAttachment(!hasAttachment)}
        />

        <FormControlLabel
          control={<Checkbox checked={hasNoComment} />}
          label="Not commented yet"
          onChange={() => setHasNoComment(!hasNoComment)}
        />
      </div>

      <div className="filter-panel-text">
        <h5>Title contains:</h5>
        <FilterbarTextSearchFavorites />
      </div>

      <div className="filter-panel-date">
        <h5>Published beetween:</h5>
        <FilterbarDatePickerFavorites />
      </div>

      <footer className="grow flex flex-col items-center justify-end">
        <Button
          variant="outlined"
          color="warning"
          className="w-40 h-8 rounded-full mb-4"
          onClick={handleClickReset}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="w-40 h-8 rounded-full"
          onClick={() => setFilterPanelIsOpen(!filterPanelIsOpen)}
        >
          Close
        </Button>
      </footer>
    </div>
  );
}

export default FilterPanelFavorites;