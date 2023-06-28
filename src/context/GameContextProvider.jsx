import { createContext } from "react";
import useGame from "../hooks/useGame";

const GameContext = createContext();

function GameContextProvider({ children }) {
  const context = useGame();

  return (
    <GameContext.Provider value={ context }>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
export { GameContextProvider };
