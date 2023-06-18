import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const IdeaContext = createContext({});

const catList = [
  { id: 1, name: "Marketing and Advertising" },
  { id: 2, name: "Sales and Business Development" },
  { id: 3, name: "Human Resources" },
  { id: 4, name: "Finance and Accounting" },
  { id: 5, name: "Project Management" },
  { id: 6, name: "Leadership and Management" },
  { id: 7, name: "Product Development" },
  { id: 8, name: "Customer Experience" },
  { id: 9, name: "Data Analysis and Insights" },
  { id: 10, name: "Information Technology" },
  { id: 11, name: "Supply Chain and Logistics" },
  { id: 12, name: "Operations and Efficiency" },
  { id: 13, name: "Risk Management" },
  { id: 14, name: "Corporate Social Responsibility" },
  { id: 15, name: "Professional Training and Development" },
  { id: 16, name: "Industry Trends and Insights" },
  { id: 17, name: "Legal and Compliance" },
  { id: 18, name: "Strategic Planning" },
  { id: 19, name: "Market Research" },
  { id: 20, name: "Business Consulting" },
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
