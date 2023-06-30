import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { t } = useContext(LanguageContext);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="language-switcher">
      <button onClick={() => setLanguage("en")} disabled={language === "en"}>
        {t("english")}
      </button>
      <button onClick={() => setLanguage("fr")} disabled={language === "fr"}>
        {t("french")}
      </button>
    </div>
  );
}

export default LanguageSwitcher;
