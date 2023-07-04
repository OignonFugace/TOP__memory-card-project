import { createContext } from "react";
import useTheme from "../hooks/useTheme";

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const context = useTheme();

  return (
    <ThemeContext.Provider value={ context }>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export { ThemeContextProvider };
