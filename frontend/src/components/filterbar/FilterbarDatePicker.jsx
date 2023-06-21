import { useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FilterContext } from "../../contexts/FilterContext";

function FilterbarDatePicker() {
  const {
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  } = useContext(FilterContext);

  const handleChangeStart = (event) => {
    setPublicationDateStart(event.$d);
  };

  const handleChangeEnd = (event) => {
    setPublicationDateEnd(event.$d);
  };

  return (
    <>
      <DatePicker
        className="filter-date-start min-w-[270px] mb-4"
        slotProps={{ textField: { size: "small" } }}
        format="DD/MM/YYYY"
        formatDensity="spacious"
        value={dayjs(publicationDateStart)}
        maxDate={dayjs(publicationDateEnd).subtract(1, "day")}
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

export default FilterbarDatePicker;
