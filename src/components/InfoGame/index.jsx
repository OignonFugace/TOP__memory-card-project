import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import "./InfoGame.css";
import { useNavigate, useMatch, useLocation } from "react-router-dom";

function InfoGame() {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/about");

  function handleCloseInfoGamePage() {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      {!match ? (
        <div className="info-game-trigger">
          <p>{t("infoGameMessage")}</p>
          <button
            onClick={() => navigate("/about", { state: { from: location } })}
          >
            {t("infoGameButton")}
          </button>
        </div>
      ) : (
        <button onClick={handleCloseInfoGamePage}>{t("closeButton")}</button>
      )}
    </div>
  );
}

export default InfoGame;
