import { useContext, useState } from "react";
import CardList from "../components/CardList";
import GameContext from "../context/GameContextProvider";
import Modal from "../components/Modal";

function GamePage({ handleBackToFrontPage }) {
  const context = useContext(GameContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function handleHeaderClick() {
    handleBackToFrontPage();
    context.resetGame();
  }

  return (
    <div>
      <header>
        <button onClick={handleHeaderClick}>Back To Menu</button>
      </header>
      <h1>Memory Card Game</h1>
      <p>Don't click on the same card twice!</p>
      <h2>
        {context.levels[context.currentLevelId - 1].name} -{" "}
        {context.levels[context.currentLevelId - 1].difficulty}
      </h2>
      <CardList />
      <p>
        {context.score} / {context.maxScore}
      </p>
      <p>{context.bestScore ? `Your record is ${context.bestScore}.` : ""}</p>

      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal isOpen={isModalOpen} close={closeModal} />
      </div>
    </div>
  );
}

export default GamePage;
