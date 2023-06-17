import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";

function GameRule() {
	const { t } = useContext(LanguageContext);

	return (
		<div className="game-rule">
			<p>{t("rule")}</p>
		</div>
	)
}

export default GameRule;
