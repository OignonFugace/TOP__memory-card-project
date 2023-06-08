import React, { useContext } from "react";
import LevelSelector from "../components/LevelSelector";
import GameContext from "../context/GameContextProvider";

function FrontPage({ initiateGame }) {
  const context = useContext(GameContext);

  const startGameAtLevel = (level) => {
    context.setCurrentLevel(level);
    initiateGame();
  };

  return (
    <div>
      <h1>Front Page</h1>
      <LevelSelector startGameAtLevel={startGameAtLevel} />
    </div>
  );
}

export default FrontPage;
