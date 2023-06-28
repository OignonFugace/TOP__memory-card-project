import "./footer.css";
import LanguageSwitcher from "../LanguageSwitcher";
import GameRule from "../GameRule";
import InfoGame from "../InfoGame";
import { useMatch } from "react-router-dom";

function Footer() {
	const match = useMatch("/board");

	return (
		<div className="app-footer">
			<LanguageSwitcher />
			{match ? <GameRule /> : <InfoGame />}
		</div>
	)
}

export default Footer;
