import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const FilterContext = createContext({});

function FilterProvider({ children }) {
  const [filterPanelIsOpen, setFilterPanelIsOpen] = useState(false);
  const [publishedBeforeXDaysFromNow, setPublishedBeforeXDaysFromNow] =
    useState(30);
  const [publishedAfterXDaysFromNow, setPublishedAfterXDaysFromNow] =
    useState(0);
  const [autorSelectionTag, setAutorSelectionTag] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [trendingTag, setTrendingTag] = useState("recent");

  const contextValue = useMemo(() => {
    return {
      filterPanelIsOpen,
      setFilterPanelIsOpen,
      publishedBeforeXDaysFromNow,
      setPublishedBeforeXDaysFromNow,
      publishedAfterXDaysFromNow,
      setPublishedAfterXDaysFromNow,
      autorSelectionTag,
      setAutorSelectionTag,
      selectedCategories,
      setSelectedCategories,
      trendingTag,
      setTrendingTag,
    };
  }, [
    filterPanelIsOpen,
    setFilterPanelIsOpen,
    publishedBeforeXDaysFromNow,
    setPublishedBeforeXDaysFromNow,
    publishedAfterXDaysFromNow,
    setPublishedAfterXDaysFromNow,
    autorSelectionTag,
    setAutorSelectionTag,
    selectedCategories,
    setSelectedCategories,
    trendingTag,
    setTrendingTag,
  ]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
