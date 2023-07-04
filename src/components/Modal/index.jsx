import { useContext, useEffect } from "react";
import { GameContext, LanguageContext } from "../../contexts";
import "./modal.css";
import {
  CLOSE_MODAL,
  GAME_STATE_FINISHED,
  STAGE_STATE_LOST,
  STAGE_STATE_WON,
} from "../../utils/constants";

function Modal() {
  const { t } = useContext(LanguageContext);
  const { dispatch, gameState, stageState, isModalOpen, modalCallback } =
    useContext(GameContext);

  function handleCloseModal() {
    modalCallback();
    dispatch({ type: CLOSE_MODAL });
  }

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === "Enter") {
        handleCloseModal();
      }
    }
    if (isModalOpen) {
      window.addEventListener("keyup", handleKeyUp);
    }
    return () => 
      window.removeEventListener("keyup", handleKeyUp);
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const bodyMessage =
    gameState === GAME_STATE_FINISHED
      ? t("gameEndMessage")
      : stageState === STAGE_STATE_WON
      ? t("victoryMessage")
      : stageState === STAGE_STATE_LOST
      ? t("defeatMessage")
      : "";

  const buttonMessage =
    gameState === GAME_STATE_FINISHED
      ? t("backToMenu")
      : stageState === STAGE_STATE_WON
      ? t("victoryButton")
      : stageState === STAGE_STATE_LOST
      ? t("defeatButton")
      : "";

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{bodyMessage}</h2>
        <button onClick={handleCloseModal} >{buttonMessage}</button>
      </div>
    </div>
  );
}

export default Modal;
