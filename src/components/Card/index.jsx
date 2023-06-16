import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./card.css";
import {
  SELECT_CARD,
  SET_DISPLAYED_CARDS,
  SET_STAGE_STATE,
  STAGE_STATE_WON,
  STAGE_STATE_LOST,
} from "../../utils/constants";

function handleClick(card, score, maxScore, dispatch) {
  if (card.isClicked) {
    dispatch({ type: SET_STAGE_STATE, payload: { state: STAGE_STATE_LOST } });
  } else {
    dispatch({ type: SELECT_CARD, payload: { card: card } });
    if (score + 1 === maxScore) {
      dispatch({ type: SET_STAGE_STATE, payload: { state: STAGE_STATE_WON } });
    } else {
      dispatch({ type: SET_DISPLAYED_CARDS });
    }
  }
}

function Card({ card }) {
  const { dispatch, score, maxScore } = useContext(GameContext);

  return (
    <div
      className="card"
      onClick={() => handleClick(card, score, maxScore, dispatch)}
    >
      <p>{card.itemName}</p>
    </div>
  );
}

export default Card;
