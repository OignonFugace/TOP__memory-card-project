import { createContext } from "react";
import useGame from "../hooks/useGame";

const GameContext = createContext();

function GameContextProvider({ children, handleBackToFrontPage }) {
  const context = useGame({handleBackToFrontPage});

  return (
    <GameContext.Provider value={ context }>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
export { GameContextProvider };
