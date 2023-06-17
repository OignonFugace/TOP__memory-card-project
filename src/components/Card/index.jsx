import { useContext, useEffect, useState } from "react";
import LanguageContext from "../../context/LanguageContext";
import GameContext from "../../context/GameContextProvider";
import "./card.css";
import sampleImg from "../../assets/img/sample.jpg";
import {
  SELECT_CARD,
  SET_DISPLAYED_CARDS,
  SET_STAGE_STATE,
  STAGE_STATE_WON,
  STAGE_STATE_LOST,
} from "../../utils/constants";
import useFitText from "use-fit-text";

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
  const { t, language } = useContext(LanguageContext);
  const { dispatch, score, maxScore } = useContext(GameContext);
  const { fontSize, ref } = useFitText();
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [language]);

  return (
    <div
      className="card"
      onClick={() => handleClick(card, score, maxScore, dispatch)}
      key={renderCount}
    >
      <div
        className="card__picture"
        style={{ backgroundImage: `url(${sampleImg})` }}
      ></div>

      <div className="card__title">
        <p
          ref={ref}
          style={{ fontSize, height: 34, width: 195, whiteSpace: "nowrap" }}
        >
          {card.itemName[t("language")]}
        </p>
      </div>
    </div>
  );
}

export default Card;
