import { useEffect } from "react";
import { useLanguageContext } from "../contexts/languages.context";
import {
  RECENTLY_SELECTED_LANGUAGE,
  SAVED_LANGUAGE_HISTORY,
} from "../Util/constants/localStorage";
import {
  getItem,
  getJSON,
  setItem,
  setJSON,
} from "../service/LocalStorageService";

const MAX_HISTORY_LENGTH = 3;

const useLanguage = () => {
  const { language, languageHistory, changeLanguage, setLanguageHistory } =
    useLanguageContext();

  useEffect(() => {
    const selectedLanguage = getItem(RECENTLY_SELECTED_LANGUAGE);
    if (language === selectedLanguage) {
      return;
    }

    // LRU Cache based save
    setItem(RECENTLY_SELECTED_LANGUAGE, language);
    const languageHistory = new Set(getJSON(SAVED_LANGUAGE_HISTORY) || []);
    languageHistory.delete(language);
    languageHistory.add(language);

    if (languageHistory.size > MAX_HISTORY_LENGTH) {
      const oldestLanguage = Array.from(languageHistory)[0];
      languageHistory.delete(oldestLanguage);
    }

    const newHistory = Array.from(languageHistory);
    setJSON(SAVED_LANGUAGE_HISTORY, newHistory);
    setLanguageHistory(newHistory.reverse());
  }, [language]);

  const setSelectedLanguage = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return { selectedLanguage: language, languageHistory, setSelectedLanguage };
};

export default useLanguage;
