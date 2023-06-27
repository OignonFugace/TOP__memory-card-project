import { useContext } from "react";
import AppContext from "../../context/AppContextProvider";
import LanguageContext from "../../context/LanguageContext";
import "./InfoGame.css";

function InfoGame() {
  const { isInfoGamePageOpen, setIsInfoGamePageOpen } = useContext(AppContext);
  const { t } = useContext(LanguageContext);

  return (
    <div>
      {!isInfoGamePageOpen ? (
        <div className="info-game-trigger">
          <p>{t("infoGameMessage")}</p>
          <button onClick={() => setIsInfoGamePageOpen(true)}>{t("infoGameButton")}</button>
        </div>
      ) : (
        <button onClick={() => setIsInfoGamePageOpen(false)}>{t("closeButton")}</button>
      )}
    </div>
  );
}

export default InfoGame;
