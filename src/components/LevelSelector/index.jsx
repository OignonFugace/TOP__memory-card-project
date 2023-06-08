import { useContext } from "react"
import GameContext from "../../context/GameContextProvider"

function LevelSelector({ startGameAtLevel }) {
	const context = useContext(GameContext);

	return (
		<div 
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
				gap: "5px",
			}}
		>
			{context.levels.map(level => (
				<button
					key={level.id}
					onClick={() => {
						if (level.id <= context.currentLevelId) {
							startGameAtLevel(level.id);
						}
					}}
					disabled={level.state === "closed"}
				>
					{level.name} - {level.difficulty}
				</button>
				))
			}
		</div>
	)
}

export default LevelSelector;
