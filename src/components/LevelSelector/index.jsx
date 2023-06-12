import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./levelSelector.css";

function LevelSelector({ startGameAtLevel }) {
  const { levels } = useContext(GameContext);

  return (
    <div className="level-selector">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => {
            if (level.state !== "closed") {
              startGameAtLevel(level.id);
            }
          }}
          disabled={level.state === "closed"}
        >
          {level.name} - {level.difficulty}
        </button>
      ))}
    </div>
  );
}

export default LevelSelector;
