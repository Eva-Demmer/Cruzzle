import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const IdeaContext = createContext({});

function IdeaProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);

  const contextValue = useMemo(() => {
    return {
      categoryList,
      setCategoryList,
    };
  }, [categoryList, setCategoryList]);

  return (
    <IdeaContext.Provider value={contextValue}>{children}</IdeaContext.Provider>
  );
}

IdeaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaProvider;
