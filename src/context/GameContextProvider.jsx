import { createContext } from "react";
import useGame from "../hooks/useGame";

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const context = useGame();
  return (
    <GameContext.Provider value={ context }>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
