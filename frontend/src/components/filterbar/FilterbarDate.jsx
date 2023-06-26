import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarAutor({ isDisable }) {
  const {
    dateDelta,
    setDateDelta,
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  } = useContext(FilterContext);
  const [isDisableByCustomDate, setisDisableByCustomDate] = useState(false);

  const today = dayjs().locale("fr");
  const publicationDateEndIsToday =
    dayjs(publicationDateEnd).diff(today, "day") === 0;
  const deltaList = [30, 7, 0];

  const handleChange = (event) => {
    const { value } = event.target;
    setDateDelta(value);
    setPublicationDateEnd(dayjs().locale("fr").format("YYYY-MM-DD HH:mm:ss"));
    setPublicationDateStart(
      dayjs().locale("fr").subtract(value, "day").format("YYYY-MM-DD HH:mm:ss")
    );
  };

  useEffect(() => {
    if (deltaList.includes(dateDelta) && publicationDateEndIsToday) {
      setisDisableByCustomDate(false);
    } else {
      setisDisableByCustomDate(true);
    }
  }, [dateDelta]);

  useEffect(() => {
    const daysDiff = dayjs(publicationDateEnd).diff(
      dayjs(publicationDateStart),
      "day"
    );
    setDateDelta(daysDiff);
  }, [publicationDateStart, publicationDateEnd]);

  return (
    <FormControl disabled={isDisable} className="w-40">
      <Select
        id="filter-date-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={deltaList.includes(dateDelta) ? dateDelta : ""}
        displayEmpty
        onChange={handleChange}
        renderValue={(value) => {
          const textDict = {
            30: "past month",
            7: "past week",
            0: "today",
          };
          return (
            <>
              <CalendarDaysIcon className="w-4 mr-2" />
              {isDisableByCustomDate ? (
                <span>custom</span>
              ) : (
                <span>{textDict[value]}</span>
              )}
            </>
          );
        }}
      >
        <MenuItem value={30}>past month</MenuItem>
        <MenuItem value={7}>past week</MenuItem>
        <MenuItem value={0}>today</MenuItem>
      </Select>
    </FormControl>
  );
}

FilterbarAutor.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
