import { useContext, useEffect, useState } from "react";
import "./App.css";
import { GameContextProvider } from "./context/GameContextProvider";
import FrontPage from "./pages/FrontPage";
import GamePage from "./pages/GamePage";
import Loading from "./pages/Loading";

function App() {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");


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
      {isAppLoading ? (
        <Loading />
      ) : (
        <GameContextProvider>
          {!isGameStarted ? (
            <FrontPage initiateGame={() => setIsGameStarted(true)} />
          ) : (
            <GamePage handleBackToFrontPage={() => setIsGameStarted(false)} />
          )}
        </GameContextProvider>
      )}
    </div>
  );
}

export default App;
