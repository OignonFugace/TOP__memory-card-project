import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";

function Card({ card }) {
  const { 
    handleCardClick,
  } = useContext(GameContext);

  return (
    <div
      style={{
        border: "2px solid currentColor",
        borderRadius: "3px",
        padding: "0 1ch",
        cursor: "pointer",
      }}
      onClick={() => handleCardClick(card)}
    >
      <p>{card.jobName}</p>
    </div>
  );
}

export default Card;
