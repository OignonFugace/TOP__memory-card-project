import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import Card from "../Card";
import "./cardList.css";

function CardList() {
  const { displayedCards } = useContext(GameContext);

  return (
    <div className="card-list">
      {displayedCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
