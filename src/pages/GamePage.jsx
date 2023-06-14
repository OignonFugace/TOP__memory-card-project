import { useContext } from "react";
import CardList from "../components/CardList";
import GameContext from "../context/GameContextProvider";
import Modal from "../components/Modal";
import ThemeContext from "../context/ThemeContextProvider";

const RESET_STAGE = "RESET_STAGE";

function GamePage() {
  const {
    dispatch,
    levels,
    currentLevelId,
    score,
    maxScore,
    bestScore,
    handleBackToFrontPage,
  } = useContext(GameContext);
  const { currentDeck } = useContext(ThemeContext);

  function handleHeaderClick() {
    handleBackToFrontPage();
    dispatch({ type: RESET_STAGE, payload: [...currentDeck] });
  }

  return (
    <div>
      <header>
        <button onClick={handleHeaderClick}>Back To Menu</button>
      </header>
      <h1>Memory Card Game</h1>
      <p>Don't click on the same card twice!</p>
      <h2>
        {levels[currentLevelId - 1].name} -{" "}
        {levels[currentLevelId - 1].difficulty}
      </h2>
      <CardList />
      <p>
        {score} / {maxScore}
      </p>
      <p>{bestScore ? `Your record is ${bestScore}.` : ""}</p>

      <Modal />
    </div>
  );
}

export default GamePage;
