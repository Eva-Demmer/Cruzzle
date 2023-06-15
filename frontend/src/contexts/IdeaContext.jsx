import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const IdeaContext = createContext({});

const catList = [
  "Marketing and Advertising",
  "Sales and Business Development",
  "Human Resources",
  "Finance and Accounting",
  "Project Management",
  "Leadership and Management",
  "Product Development",
  "Customer Experience",
  "Data Analysis and Insights",
  "Information Technology",
  "Supply Chain and Logistics",
  "Operations and Efficiency",
  "Risk Management",
  "Corporate Social Responsibility",
  "Professional Training and Development",
  "Industry Trends and Insights",
  "Legal and Compliance",
  "Strategic Planning",
  "Market Research",
  "Business Consulting",
];

function IdeaProvider({ children }) {
  const [categoryList, setCategoryList] = useState(catList);

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
