import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarAutor({ isDisable }) {
  const {
    dateDelta,
    setDateDelta,
    setPublicationDateStart,
    setPublicationDateEnd,
  } = useContext(FilterContext);

  const handleChange = (event) => {
    setDateDelta(event.target.value);
  };

  useEffect(() => {
    setPublicationDateEnd(dayjs().locale("fr"));
    setPublicationDateStart(dayjs().locale("fr").subtract(dateDelta, "day"));
  }, [dateDelta]);

  return (
    <FormControl sx={{ width: [135, 135, 155] }} disabled={isDisable}>
      <Select
        id="filter-date-select"
        className="h-10 rounded-full"
        color="primary"
        value={dateDelta}
        onChange={handleChange}
      >
        <MenuItem value={30}>last 30 days</MenuItem>
        <MenuItem value={7}>last 7 days</MenuItem>
        <MenuItem value={0}>today</MenuItem>
      </Select>
    </FormControl>
  );
}

FilterbarAutor.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
