import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./modal.css";

function Modal() {
  const { resetGame, gameState, isModalOpen, closeModal } =
    useContext(GameContext);

  if (!isModalOpen) return null;

  const bodyMessage =
    gameState === "won"
      ? "You won!"
      : gameState === "lost"
      ? "You lost..."
      : gameState === "finished"
      ? "Well, you are best : you finished the game !"
      : "";

  const buttonMessage =
    gameState === "won"
      ? "Continue on next level"
      : gameState === "lost"
      ? "Try again"
      : gameState === "finished"
      ? "Back To Menu"
      : "";

  function handleCloseModal() {
    closeModal();
    resetGame();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{bodyMessage}</h2>
        <button onClick={handleCloseModal}>{buttonMessage}</button>
      </div>
    </div>
  );
}

export default Modal;
