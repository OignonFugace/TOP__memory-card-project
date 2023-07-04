import { useContext } from "react";
import { LanguageContext, ThemeContext } from "../../contexts";
import "./ThemeSelector.css";
import { themesData } from "../../data/themeData";

function ThemeSelector() {
  const { t } = useContext(LanguageContext);
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  function handleThemeChange(e) {
    setCurrentTheme(e.target.value);
  }

  return (
    <div className="theme-selector">
      <h2>{t("subtitle")}</h2>
      <div>
        <label htmlFor="theme-select">{t("themeSelectionPrompt")}</label>
        <select
          value={currentTheme}
          onChange={handleThemeChange}
          id="theme-select"
        >
          {Object.keys(themesData).map((themeKey) => (
            <option key={themeKey} value={themeKey}>
              {themesData[themeKey].themeName[t("language")]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ThemeSelector;
