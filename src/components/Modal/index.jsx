import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./modal.css";
import {
  CLOSE_MODAL,
  GAME_STATE_FINISHED,
  STAGE_STATE_LOST,
  STAGE_STATE_WON,
} from "../../utils/constants";

function Modal() {
  const { dispatch, gameState, stageState, isModalOpen, modalCallback } =
    useContext(GameContext);

  function handleCloseModal() {
    modalCallback();
    dispatch({ type: CLOSE_MODAL });
  }

  if (!isModalOpen) return null;

  const bodyMessage =
    gameState === GAME_STATE_FINISHED
      ? "Well, you are best : you finished the game !"
      : stageState === STAGE_STATE_WON
      ? "You won!"
      : stageState === STAGE_STATE_LOST
      ? "You lost..."
      : "";

  const buttonMessage =
    gameState === GAME_STATE_FINISHED
      ? "Back To Menu"
      : stageState === STAGE_STATE_WON
      ? "Continue on next level"
      : stageState === STAGE_STATE_LOST
      ? "Try again"
      : "";

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
