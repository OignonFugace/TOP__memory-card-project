import { useContext } from "react";
import CardList from "../components/CardList";
import GameContext from "../context/GameContextProvider";

function GameBoard({ handleBackToFrontPage }) {
  const context = useContext(GameContext);

  function handleHeaderClick() {
    handleBackToFrontPage()
    context.resetGame();
  }

  return (
    <div>
      <header>
        <h2
          onClick={handleHeaderClick}
          style={{ cursor: "pointer" }}
        >
          Memory Card Game
        </h2>
      </header>
      <h1>Game Board Page</h1>
      <h2>Level {context.currentLevel.name}</h2>
      <p>Don't click on the same card twice!</p>
      <CardList />
      <p>
        {context.score} / {context.maxScore}
      </p>
    </div>
  );
}

export default GameBoard;
