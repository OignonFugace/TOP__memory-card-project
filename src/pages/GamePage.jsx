import { useContext } from "react";
import CardList from "../components/CardList";
import GameContext from "../context/GameContextProvider";
import Modal from "../components/Modal";
import ThemeContext from "../context/ThemeContextProvider";
import LanguageContext from "../context/LanguageContext";
import AppContext from "../context/AppContextProvider";

const LOAD_GAME_THEME = "LOAD_GAME_THEME";

function GamePage() {
  const { setIsGameStarted } = useContext(AppContext);
  const { t } = useContext(LanguageContext);
  const {
    dispatch,
    levels,
    currentLevelId,
    score,
    maxScore,
    bestScore,
  } = useContext(GameContext);

  const { themes, currentTheme } = useContext(ThemeContext);

  function handleHeaderClick() {
    dispatch({ type: LOAD_GAME_THEME, payload: { themes, currentTheme } });
    setIsGameStarted(false);
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
