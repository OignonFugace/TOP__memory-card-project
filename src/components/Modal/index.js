import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./modal.css";

function Modal({ isOpen, close }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
	<div>The Modal</div>
	<button onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
