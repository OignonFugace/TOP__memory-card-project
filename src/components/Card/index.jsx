import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./card.css";

const SELECT_CARD = "SELECT_CARD";
const DISPLAY_CARDS = "DISPLAY_CARDS";

function Card({ card }) {
  const { dispatch, levels, currentLevelId } = useContext(GameContext);

  return (
    <div
      className="card"
      onClick={() => {
        dispatch({
          type: SELECT_CARD,
          payload: { id: card.id, isClicked: card.isClicked },
        });
        if (!card.isClicked) {
          dispatch({
            type: DISPLAY_CARDS,
            totalDisplayedCards: levels[currentLevelId - 1].totalDisplayedCards,
          });
        }
      }}
    >
      <p>{card.itemName}</p>
    </div>
  );
}

export default Card;
