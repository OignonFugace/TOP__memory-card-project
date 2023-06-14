import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import ThemeContext from "../../context/ThemeContextProvider";
import "./modal.css";

const CLOSE_MODAL = "CLOSE_MODAL";
const RESET_STAGE = "RESET_STAGE";

const GAME_STATE_FINISHED = "GAME_STATE_FINISHED";
const STAGE_STATE_LOST = "STAGE_STATE_LOST"; 
const STAGE_STATE_WON = "STAGE_STATE_WON";

function Modal() {
  const { dispatch, gameState, stageState, isModalOpen } = useContext(GameContext);
  const { currentDeck } = useContext(ThemeContext);

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
  
  function handleCloseModal() {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: RESET_STAGE, payload: [...currentDeck] });
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
