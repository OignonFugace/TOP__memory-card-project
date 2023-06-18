import { useEffect, useState } from "react";
import "./App.css";
import { GameContextProvider } from "./context/GameContextProvider";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import FrontPage from "./pages/FrontPage";
import GamePage from "./pages/GamePage";
import Loading from "./pages/Loading";
import LanguageSwitcher from "./components/LanguageSwitcher";
import InfoGame from "./components/InfoGame";
import GameRule from "./components/GameRule";

function App() {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    setIsAppLoading(true);
    setTimeout(() => {
      setIsAppLoading(false);
    }, 0);
  }, []);

  return (
    <div className="App">
      <LanguageContextProvider>
        {isAppLoading ? (
          <Loading />
        ) : (
          <ThemeContextProvider>
            <GameContextProvider
              handleBackToFrontPage={() => setIsGameStarted(false)}
            >
              {!isGameStarted ? (
                <FrontPage initiateGame={() => setIsGameStarted(true)} />
              ) : (
                <GamePage />
              )}
              <div className="app-footer">
                <LanguageSwitcher />
                {isGameStarted ? <GameRule /> : <InfoGame />}
                
              </div>
            </GameContextProvider>
          </ThemeContextProvider>
        )}
      </LanguageContextProvider>
    </div>
  );
}

export default App;
