import React, { createContext, useContext, useState } from "react";
import { getItem, getJSON } from "../service/LocalStorageService";
import {
  RECENTLY_SELECTED_LANGUAGE,
  SAVED_LANGUAGE_HISTORY,
} from "../Util/constants/localStorage";

const DEFAULT_LANGUAGE = "PlainText";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languageHistory, setLanguageHistory] = useState(
    getJSON(SAVED_LANGUAGE_HISTORY) || []
  );

  const [language, setLanguage] = useState(
    () => getItem(RECENTLY_SELECTED_LANGUAGE) || DEFAULT_LANGUAGE
  );

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, languageHistory, setLanguageHistory, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};
