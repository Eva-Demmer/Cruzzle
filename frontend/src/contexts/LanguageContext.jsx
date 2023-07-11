import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext({});

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const langues = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={langues}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LanguageProvider;
