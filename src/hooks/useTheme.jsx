import useLocalStorage from "./useLocalStorage.jsx";
import { themesData } from "../data/themeData.js";
import { useEffect } from "react";

function useTheme() {
  const [themes, setThemes] = useLocalStorage("themes", themesData);
  const [currentTheme, setCurrentTheme] = useLocalStorage("currentTheme", "professions");

  return {
    themes,
    setThemes,
    currentTheme,
    setCurrentTheme,
  };
}

export default useTheme;
