import React, { useContext } from "react";
import LevelSelector from "../components/LevelSelector";
import ThemeSelector from "../components/ThemeSelector";
import GameContext from "../context/GameContextProvider";

function FrontPage({ initiateGame }) {
  const context = useContext(GameContext);

  const startGameAtLevel = (level) => {
    context.setCurrentLevelId(level);
    initiateGame();
  };

  return (
    <div>
      <h1>Memory Card Game</h1>
      <ThemeSelector />
      <LevelSelector startGameAtLevel={startGameAtLevel} />
    </div>
  );
}

export default FrontPage;
