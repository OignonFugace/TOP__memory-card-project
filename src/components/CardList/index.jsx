import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import Card from "../Card";
import "./cardList.css";
import Tilt from "react-parallax-tilt";

function CardList() {
  const { displayedCards } = useContext(GameContext);

  return (
    <div className="card-list">
      {Array(displayedCards.length)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <Tilt glareEnable={true}>
              <div className="tilt-wrapper">
                {displayedCards[index] && (
                  <Card
                    card={displayedCards[index]}
                  />
                )}
              </div>
            </Tilt>
          </div>
        ))}
    </div>
  );
}

export default CardList;
