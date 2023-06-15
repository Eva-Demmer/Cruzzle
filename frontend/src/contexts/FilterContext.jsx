import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const FilterContext = createContext({});

function FilterProvider({ children }) {
  const [publishedBeforeXDaysFromNow, setPublishedBeforeXDaysFromNow] =
    useState(30);
  const [publishedAfterXDaysFromNow, setPublishedAfterXDaysFromNow] =
    useState(0);
  const [autorList, setAutorList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [trending, setTrending] = useState("recent");

  const contextValue = useMemo(() => {
    return {
      publishedBeforeXDaysFromNow,
      setPublishedBeforeXDaysFromNow,
      publishedAfterXDaysFromNow,
      setPublishedAfterXDaysFromNow,
      autorList,
      setAutorList,
      selectedCategories,
      setSelectedCategories,
      trending,
      setTrending,
    };
  }, [
    publishedBeforeXDaysFromNow,
    setPublishedBeforeXDaysFromNow,
    publishedAfterXDaysFromNow,
    setPublishedAfterXDaysFromNow,
    autorList,
    setAutorList,
    selectedCategories,
    setSelectedCategories,
    trending,
    setTrending,
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
