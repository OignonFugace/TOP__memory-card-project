import { createContext } from "react";
import { en, fr } from "../data/locales";
import useLocalStorage from "../hooks/useLocalStorage";

const languages = { en, fr };

const LanguageContext = createContext();

function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useLocalStorage("language", "fr");

  const t = (key) => {
    return languages[language][key] || "";
  }

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      { children }
    </LanguageContext.Provider>
  )
}

export default LanguageContext;
export { LanguageContextProvider };
