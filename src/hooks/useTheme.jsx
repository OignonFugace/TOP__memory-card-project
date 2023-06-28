import useLocalStorage from "./useLocalStorage.jsx";
import { themesData } from "../data/themeData.js";

function useTheme() {
  const [themes, setThemes] = useLocalStorage("themes", themesData);
  const [currentTheme, setCurrentTheme] = useLocalStorage("currentTheme", "flora");

  return {
    themes,
    setThemes,
    currentTheme,
    setCurrentTheme,
  };
}

export default useTheme;
