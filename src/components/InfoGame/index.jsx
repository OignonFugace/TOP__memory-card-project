import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import "./InfoGame.css";

function InfoGame() {
	const { t } = useContext(LanguageContext);

	return (
		<div>
			<div className="info-game-trigger">
				<p>{t("infoGameMessage")}</p>
				<button>{t("infoGameButton")}</button>
			</div>
		</div>
	)
}

export default InfoGame;
