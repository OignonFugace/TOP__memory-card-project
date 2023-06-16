import { createContext, useState } from "react";
import { en, fr } from "../data/locales";

const languages = { en, fr };

const LanguageContext = createContext();

function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("fr");

  const t = (key) => {
    return languages[language][key] || "";
  }

  return (
    <LanguageContext.Provider value={{ t, setLanguage }}>
      { children }
    </LanguageContext.Provider>
  )
}

export default LanguageContext;
export { LanguageContextProvider };
