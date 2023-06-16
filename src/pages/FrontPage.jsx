import React, { useContext } from "react";
import LevelSelector from "../components/LevelSelector";
import ThemeSelector from "../components/ThemeSelector";
import GameContext from "../context/GameContextProvider";

const SET_CURRENT_LEVEL_ID = "SET_CURRENT_LEVEL_ID";
const LOAD_STAGE = "LOAD_STAGE";
const SET_DISPLAYED_CARDS = "SET_DISPLAYED_CARDS";
const SET_STAGE_STATE = "SET_STAGE_STATE";

const STAGE_STATE_RUNNING = "STAGE_STATE_RUNNING";

function FrontPage({ initiateGame }) {
  const { dispatch } = useContext(GameContext);

  const startGameAtLevel = (levelId) => {
    dispatch({ type: SET_CURRENT_LEVEL_ID, payload: { currentLevelId: levelId } })
    dispatch({ type: LOAD_STAGE });
    dispatch({ type: SET_DISPLAYED_CARDS });
    dispatch({ type: SET_STAGE_STATE, payload: { state: STAGE_STATE_RUNNING } })
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
