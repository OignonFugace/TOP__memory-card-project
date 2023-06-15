import React, { useContext } from "react";
import LevelSelector from "../components/LevelSelector";
import ThemeSelector from "../components/ThemeSelector";
import GameContext from "../context/GameContextProvider";

const SET_INITIAL_CURRENT_LEVEL_ID = "SET_INITIAL_CURRENT_LEVEL_ID";

function FrontPage({ initiateGame }) {
  const { dispatch } = useContext(GameContext);

  const startGameAtLevel = (levelId) => {
    dispatch({ type: SET_INITIAL_CURRENT_LEVEL_ID, payload: { currentLevelId: levelId } })
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
