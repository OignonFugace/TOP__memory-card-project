import { useContext } from "react";
import GameContext from "../../context/GameContextProvider";
import "./levelSelector.css";

const LEVEL_STATE_CLOSED = "LEVEL_STATE_CLOSED";

function LevelSelector({ startGameAtLevel }) {
  const { levels } = useContext(GameContext);

  return (
    <div className="level-selector">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => {
            if (level.state !== LEVEL_STATE_CLOSED) {
              startGameAtLevel(level.id);
            }
          }}
          disabled={level.state === LEVEL_STATE_CLOSED}
        >
          {level.name} - {level.difficulty}
        </button>
      ))}
    </div>
  );
}

export default LevelSelector;
