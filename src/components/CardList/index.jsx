import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import Card from "../Card";
import "./cardList.css";
import Tilt from "react-parallax-tilt";

function CardList() {
  const { displayedCards } = useContext(GameContext);

  return (
    <div className="card-list">
      {displayedCards?.map((card) => (
        <Tilt key={card.id} glareEnable={true}>
          <Card card={card} />
        </Tilt>
      ))}
    </div>
  );
}

export default CardList;
