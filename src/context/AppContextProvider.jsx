import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isInfoGamePageOpen, setIsInfoGamePageOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        setIsAppLoading,
        isGameStarted,
        setIsGameStarted,
        isInfoGamePageOpen,
        setIsInfoGamePageOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
export { AppContextProvider };
