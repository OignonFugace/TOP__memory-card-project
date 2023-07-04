import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext, ThemeContext, LanguageContext } from "../contexts";
import { CardList, Modal } from "../components";

const LOAD_GAME_THEME = "LOAD_GAME_THEME";

function GamePage() {
  const { t } = useContext(LanguageContext);
  const { themes, currentTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const {
    dispatch,
    levels,
    currentLevelId,
    score,
    maxScore,
    bestScore,
  } = useContext(GameContext);


  function handleHeaderClick() {
    dispatch({ type: LOAD_GAME_THEME, payload: { themes, currentTheme } });
    navigate("/");
  }

  return (
    <div className="game-page">
      <div className="top-bar">
        <div className="top-bar-left-corner">
          <button onClick={handleHeaderClick}>{t("backToMenu")}</button>
        </div>
        <div className="score-board">
          <p className="level-indication">
            {levels[currentLevelId - 1].name.fr} -{" "}
            {levels[currentLevelId - 1].difficulty.fr}
          </p>
          <p>
            {t("score")}
            {score} / {maxScore}
          </p>
          <p>{bestScore ? `${t("bestScoreMessage")} ${bestScore}.` : ""}</p>
        </div>
      </div>
      <div className="game-board">
        <CardList />
      </div>

      <Modal />
    </div>
  );
}

export default GamePage;
