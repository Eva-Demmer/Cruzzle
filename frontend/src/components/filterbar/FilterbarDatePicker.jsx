import { useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FilterContext } from "../../contexts/FilterContext";

function FilterbarDatePicker() {
  const {
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  } = useContext(FilterContext);

  const handleChangeStart = (event) => {
    setPublicationDateStart(event);
  };

  const handleChangeEnd = (event) => {
    setPublicationDateEnd(event);
  };

  return (
    <>
      <DatePicker
        className="filter-date-start w-[270px] mb-4"
        slotProps={{ textField: { size: "small" } }}
        format="DD/MM/YYYY"
        formatDensity="spacious"
        defaultValue={publicationDateStart}
        maxDate={publicationDateEnd}
        onChange={handleChangeStart}
      />
      <DatePicker
        className="filter-date-end w-[270px] bg-white"
        slotProps={{ textField: { size: "small" } }}
        format="DD/MM/YYYY"
        formatDensity="spacious"
        defaultValue={publicationDateEnd}
        minDate={publicationDateStart}
        disableFuture
        onChange={handleChangeEnd}
      />
    </>
  );
}

export default FilterbarDatePicker;
