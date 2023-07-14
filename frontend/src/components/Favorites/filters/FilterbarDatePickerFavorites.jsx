import { useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";

function FilterbarDatePickerFavorites() {
  const {
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  } = useContext(FilterFavoritesContext);

  const handleChangeStart = (event) => {
    const inputDate = event.$d;
    setPublicationDateStart(dayjs(inputDate).format("YYYY-MM-DD HH:mm:ss"));
  };

  const handleChangeEnd = (event) => {
    const inputDate = event.$d;
    setPublicationDateEnd(dayjs(inputDate).format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <>
      <DatePicker
        className="filter-date-start min-w-[270px] mb-4"
        slotProps={{ textField: { size: "small" } }}
        format="DD/MM/YYYY"
        formatDensity="spacious"
        value={dayjs(publicationDateStart)}
        maxDate={dayjs(publicationDateEnd)}
        onChange={handleChangeStart}
      />
      <DatePicker
        className="filter-date-end min-w-[270px] bg-white"
        slotProps={{ textField: { size: "small" } }}
        format="DD/MM/YYYY"
        formatDensity="spacious"
        value={dayjs(publicationDateEnd)}
        minDate={dayjs(publicationDateStart)}
        disableFuture
        onChange={handleChangeEnd}
      />
    </>
  );
}

export default FilterbarDatePickerFavorites;