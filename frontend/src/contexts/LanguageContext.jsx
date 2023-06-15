import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext({});

export const langueList = ["FR", "EN"];

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(langueList[1]);

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
