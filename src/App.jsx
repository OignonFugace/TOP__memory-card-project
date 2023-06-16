import { useEffect, useState } from "react";
import "./App.css";
import { GameContextProvider } from "./context/GameContextProvider";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import FrontPage from "./pages/FrontPage";
import GamePage from "./pages/GamePage";
import Loading from "./pages/Loading";
import LanguageSwitcher from "./components/LanguageSwitcher";

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
    <div
      className="App"
      style={{
        padding: "1rem",
      }}
    >
      <LanguageContextProvider>
        {isAppLoading ? (
          <Loading />
        ) : (
          <ThemeContextProvider>
            <GameContextProvider handleBackToFrontPage={() => setIsGameStarted(false)}>
              {!isGameStarted ? (
                <FrontPage initiateGame={() => setIsGameStarted(true)} />
              ) : (
                <GamePage />
              )}
            </GameContextProvider>
          </ThemeContextProvider>
        )}
        <LanguageSwitcher />
      </LanguageContextProvider>
    </div>
  );
}

export default App;
