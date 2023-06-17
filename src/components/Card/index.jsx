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

function Card({ card, isFlipped, setIsFlipped }) {
  const { t, language } = useContext(LanguageContext);
  const { dispatch, score, maxScore } = useContext(GameContext);
  const { fontSize, ref } = useFitText();
  const [renderCount, setRenderCount] = useState(0);

  function handleClick(card) {
    setIsFlipped(true);

    setTimeout(() => {
      if (card.isClicked) {
        dispatch({
          type: SET_STAGE_STATE,
          payload: { state: STAGE_STATE_LOST },
        });
      } else {
        dispatch({ type: SELECT_CARD, payload: { card: card } });
        if (score + 1 === maxScore) {
          dispatch({
            type: SET_STAGE_STATE,
            payload: { state: STAGE_STATE_WON },
          });
        } else {
          dispatch({ type: SET_DISPLAYED_CARDS });
        }
      }
      setTimeout(() => {
        setIsFlipped(false);
      }, 500);
    }, 500);
  }

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [language]);

  return (
    <div
      className={`card ${isFlipped ? "is-flipped" : ""}`}
      onClick={() => handleClick(card)}
      key={renderCount}
    >
      <div className="card-face front-face">
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

      <div className="card-face back-face">Some Text</div>
    </div>
  );
}

export default Card;
