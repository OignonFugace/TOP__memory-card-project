import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAppLoading, setIsAppLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        setIsAppLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
export { AppContextProvider };
