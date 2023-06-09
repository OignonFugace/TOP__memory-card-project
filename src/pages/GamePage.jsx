import { useContext } from "react";
import CardList from "../components/CardList";
import GameContext from "../context/GameContextProvider";
import Modal from "../components/Modal";

function GamePage({ handleBackToFrontPage }) {
  const { resetGame, levels, currentLevelId, score, maxScore, bestScore, openModal } =
    useContext(GameContext);

  function handleHeaderClick() {
    handleBackToFrontPage();
    resetGame();
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
