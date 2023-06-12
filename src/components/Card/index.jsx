import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./card.css";

function Card({ card }) {
  const { 
    handleCardClick,
  } = useContext(GameContext);

  return (
    <div
      className="card"
      onClick={() => handleCardClick(card)}
    >
      <p>{card.itemName}</p>
    </div>
  );
}

export default Card;
