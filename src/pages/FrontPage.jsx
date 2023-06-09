import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FLIP_CARDS_TO_BACK } from "../utils/constants";
import { GameContext, LanguageContext } from "../contexts";
import { ThemeSelector, LevelSelector } from "../components";

const SET_CURRENT_LEVEL_ID = "SET_CURRENT_LEVEL_ID";
const LOAD_STAGE = "LOAD_STAGE";
const SET_DISPLAYED_CARDS = "SET_DISPLAYED_CARDS";
const SET_STAGE_STATE = "SET_STAGE_STATE";

const STAGE_STATE_RUNNING = "STAGE_STATE_RUNNING";

function FrontPage() {
  const { t } = useContext(LanguageContext);
  const { dispatch } = useContext(GameContext);
  const navigate = useNavigate();

  const startGameAtLevel = (levelId) => {
    dispatch({ type: FLIP_CARDS_TO_BACK });
    dispatch({ type: SET_CURRENT_LEVEL_ID, payload: { currentLevelId: levelId } })
    dispatch({ type: LOAD_STAGE });
    dispatch({ type: SET_DISPLAYED_CARDS });
    dispatch({ type: SET_STAGE_STATE, payload: { state: STAGE_STATE_RUNNING } })
    navigate("/board");
  };

  return (
    <div className="front-page">
      <h1>{t("title")}</h1>
      <ThemeSelector />
      <LevelSelector startGameAtLevel={startGameAtLevel} />
    </div>
  );
}

export default FrontPage;
