import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./card.css";

const SELECT_CARD = "SELECT_CARD";

function Card({ card }) {
  const { 
    dispatch,
  } = useContext(GameContext);

  return (
    <div
      className="card"
      onClick={() => dispatch({ type: SELECT_CARD, payload: card })}
    >
      <p>{card.itemName}</p>
    </div>
  );
}

export default Card;
