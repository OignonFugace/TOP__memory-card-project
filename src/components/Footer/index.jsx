import "./footer.css";
import LanguageSwitcher from "../LanguageSwitcher";
import GameRule from "../GameRule";
import InfoGame from "../InfoGame";
import { useContext } from "react";
import AppContext from "../../context/AppContextProvider";

function Footer() {
	const { isGameStarted } = useContext(AppContext);
	return (
		<div className="app-footer">
			<LanguageSwitcher />
			{isGameStarted ? <GameRule /> : <InfoGame />}
		</div>
	)
}

export default Footer;
