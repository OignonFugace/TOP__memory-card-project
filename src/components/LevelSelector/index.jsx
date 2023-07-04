import { useContext } from "react";
import { GameContext, LanguageContext } from "../../contexts";
import "./levelSelector.css";
import { LEVEL_STATE_CLOSED } from "../../utils/constants";

function LevelSelector({ startGameAtLevel }) {
  const { t } = useContext(LanguageContext);
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
          {level.name[t("language")]} - {level.difficulty[t("language")]}
        </button>
      ))}
    </div>
  );
}

export default LevelSelector;
