import { useContext } from "react";
import { LanguageContext } from "../../contexts";

function GameRule() {
	const { t } = useContext(LanguageContext);

	return (
		<div className="game-rule">
			<p>{t("rule")}</p>
		</div>
	)
}

export default GameRule;
