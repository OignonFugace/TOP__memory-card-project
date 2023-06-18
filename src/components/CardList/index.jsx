import { useContext, useState } from "react";
import GameContext from "../../context/GameContextProvider";
import Card from "../Card";
import "./cardList.css";
import Tilt from "react-parallax-tilt";

function CardList() {
  const { displayedCards } = useContext(GameContext);
  const [isDeckFlipped, setIsDeckFlipped] = useState(false);

  return (
    <div className="card-list">
      {displayedCards?.map((card) => (
        <div key={card.id} >
          <Tilt glareEnable={true}>
            <div className="tilt-wrapper">
              <Card card={card} isFlipped={isDeckFlipped} setIsFlipped={setIsDeckFlipped} />
            </div>
          </Tilt>
        </div>
      ))}
    </div>
  );
}

export default CardList;
