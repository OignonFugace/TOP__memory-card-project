import { useContext } from "react";
import CardList from "../components/CardList";
import GameContext from "../context/GameContextProvider";
import Modal from "../components/Modal";
import ThemeContext from "../context/ThemeContextProvider";
import LanguageContext from "../context/LanguageContext";

const LOAD_GAME_THEME = "LOAD_GAME_THEME";

function GamePage() {
  const { t } = useContext(LanguageContext);
  const {
    dispatch,
    levels,
    currentLevelId,
    score,
    maxScore,
    bestScore,
    handleBackToFrontPage,
  } = useContext(GameContext);

  const { themes, currentTheme } = useContext(ThemeContext);

  function handleHeaderClick() {
    dispatch({ type: LOAD_GAME_THEME, payload: { themes, currentTheme } });
    handleBackToFrontPage();
  }

  return (
    <div>
      <header>
        <button onClick={handleHeaderClick}>{t("backToMenu")}</button>
      </header>
      <h1>{t("title")}</h1>
      <p>{t("rule")}</p>
      <h2>
        {levels[currentLevelId - 1].name.fr} -{" "}
        {levels[currentLevelId - 1].difficulty.fr}
      </h2>
      <CardList />
      <p>
        {score} / {maxScore}
      </p>
      <p>{bestScore ? `${t("bestScoreMessage")} ${bestScore}.` : ""}</p>

      <Modal />
    </div>
  );
}

export default GamePage;
