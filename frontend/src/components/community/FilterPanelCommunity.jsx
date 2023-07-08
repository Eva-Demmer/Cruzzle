import { useContext } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../contexts/FilterCommunityContext";
import FilterLocations from "./filters/FilterLocations";
import FilterRoles from "./filters/FilterRoles";
import FilterAgencies from "./filters/FilterAgencies";
import FilterPositions from "./filters/FilterPositions";
import FieldSearchLastname from "./filters/FieldSearchLastname";
import FieldSearchFirstname from "./filters/FieldSearchFirstname";

function FilterPanelCommunity({
  roleFilter,
  positionFilter,
  locationFilter,
  agenciesFilter,
}) {
  const {
    filterPanelOpen,
    setFilterPanelOpen,
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
    setRoleValue,
    setPositionValue,
    setLocationValue,
    setAgenciesValue,
    setLastnameContains,
    setFirstnameContains,
    setLastnameContainsValue,
    setFirstnameContainsValue,
  } = useContext(FilterCommunityContext);

  const handleClickReset = () => {
    setPublicationDateStart(
      dayjs().locale("fr").subtract(7, "years").format("YYYY-MM-DD HH:mm:ss")
    );
    setPublicationDateEnd(dayjs().locale("fr").format("YYYY-MM-DD HH:mm:ss"));
    setLastnameContains("");
    setLastnameContainsValue("");
    setFirstnameContains("");
    setFirstnameContainsValue("");
    setAgenciesValue(0);
    setLocationValue("all");
    setPositionValue(0);
    setRoleValue("all");
  };

  const handleChangeStart = (event) => {
    const inputDate = event.$d;
    setPublicationDateStart(dayjs(inputDate).format("YYYY-MM-DD HH:mm:ss"));
  };

  const handleChangeEnd = (event) => {
    const inputDate = event.$d;
    setPublicationDateEnd(dayjs(inputDate).format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    filterPanelOpen && (
      <div
        className="h-screen w-screen md:w-80 fixed z-50 top-0 right-0 py-2 sm:py-12 px-6 flex flex-col gap-2 md:gap-6 border-solid border-gray-300 border-t-[0px] border-b-[0px] border-r-[0px] border-l-[1px] bg-white drop-shadow-xl"
        aria-label="filter-panel"
      >
        <h4>Filters</h4>
        <FilterRoles roleFilter={roleFilter} />
        <FilterLocations locationFilter={locationFilter} />
        <FilterAgencies agenciesFilter={agenciesFilter} />
        <FilterPositions positionFilter={positionFilter} />

        <div className="flex flex-col" aria-label="filter-panel-text">
          <h5>Name contains:</h5>
          <FieldSearchLastname />
          <FieldSearchFirstname />
        </div>

        <div className="filter-panel-date">
          <h5>Hired between:</h5>
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
        </div>

        <footer className="grow flex flex-col items-center justify-center sm:justify-end">
          <Button
            variant="outlined"
            color="warning"
            className="w-40 h-10 rounded-full mb-4"
            onClick={handleClickReset}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="w-40 h-10 rounded-full"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            Close
          </Button>
        </footer>
      </div>
    )
  );
}

const positionFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })
);

const roleFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
);

const locationFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  })
);

FilterPanelCommunity.propTypes = {
  roleFilter: roleFilterPropTypes.isRequired,
  positionFilter: positionFilterPropTypes.isRequired,
  locationFilter: locationFilterPropTypes.isRequired,
  agenciesFilter: locationFilterPropTypes.isRequired,
};

export default FilterPanelCommunity;
