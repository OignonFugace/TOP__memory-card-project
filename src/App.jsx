import { useContext, useEffect } from "react";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import GamePage from "./pages/GamePage";
import Loading from "./pages/Loading";
import LanguageSwitcher from "./components/LanguageSwitcher";
import InfoGame from "./components/InfoGame";
import GameRule from "./components/GameRule";
import InfoGamePage from "./pages/InfoGamePage";
import AppContext from "./context/AppContextProvider";

function App() {
  const {
    isAppLoading,
    setIsAppLoading,
    isGameStarted,
    setIsGameStarted,
    isInfoGamePageOpen,
  } = useContext(AppContext);

  useEffect(() => {
    setIsAppLoading(true);
    setTimeout(() => {
      setIsAppLoading(false);
    }, 0);
  }, []);

  return (
    <div className="App">
      {isAppLoading ? (
        <Loading />
      ) : (
        <>
          {!isGameStarted ? (
            isInfoGamePageOpen ? (
              <InfoGamePage />
            ) : (
              <FrontPage initiateGame={() => setIsGameStarted(true)} />
            )
          ) : (
            <GamePage />
          )}
          <div className="app-footer">
            <LanguageSwitcher />
            {isGameStarted ? <GameRule /> : <InfoGame />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
