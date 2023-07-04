import { useContext, useEffect, useState } from "react";
import { ThemeContext, LanguageContext, GameContext } from "../../contexts";
import "./card.css";
import {
  SELECT_CARD,
  SET_DISPLAYED_CARDS,
  SET_STAGE_STATE,
  STAGE_STATE_WON,
  STAGE_STATE_LOST,
  FLIP_CARDS_TO_BACK,
} from "../../utils/constants";
import useFitText from "use-fit-text";
import { toCamelCase } from "../../utils/string";

function Card({ card }) {
  const { t, language } = useContext(LanguageContext);
  const { dispatch, score, maxScore, isDeckFlipped } = useContext(GameContext);
  const { currentTheme } = useContext(ThemeContext);
  const { fontSize, ref } = useFitText();
  const [renderCount, setRenderCount] = useState(0);

  function handleClick(card) {
    dispatch({ type: FLIP_CARDS_TO_BACK });

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
    }, 400);
  }

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [language]);

  return (
    <div
      className={`card ${isDeckFlipped ? "is-flipped" : ""}`}
      onClick={() => handleClick(card)}
      key={renderCount}
    >
      <div className="card-face front-face">
        <div className="card__picture">
          <img
            src={
              process.env.PUBLIC_URL +
              toCamelCase(`/images/${currentTheme}/${card.itemName.en}.png`)
            }
            alt={card.itemName[t("language")]}
          />
        </div>

        <div className="card__title">
          <p
            ref={ref}
            style={{ fontSize, height: 34, width: 195, whiteSpace: "nowrap" }}
          >
            {card.itemName[t("language")]}
          </p>
        </div>
      </div>

      <div
        className="card-face back-face"
        style={{
          backgroundColor: "#F1F1E9",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/${currentTheme}/back_05.png)`,
        }}
      ></div>
    </div>
  );
}

export default Card;
