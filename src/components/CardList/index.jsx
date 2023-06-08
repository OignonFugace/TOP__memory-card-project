import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import Card from "../Card";

function CardList() {
  const { playingDeck } = useContext(GameContext);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1ch",
      }}
    >
      {playingDeck.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
