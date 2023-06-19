import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import "./InfoGame.css";

function InfoGame({ isOpen, setIsOpen }) {
  const { t } = useContext(LanguageContext);

  return (
    <div>
			{!isOpen ? (
				<div className="info-game-trigger">
					<p>{t("infoGameMessage")}</p>
					<button onClick={() => setIsOpen(true)}>{t("infoGameButton")}</button>
				</div>
			) : (
			 <button onClick={() => setIsOpen(false)}>{t("closeButton")}</button>
			)}
    </div>
  );
}

export default InfoGame;
