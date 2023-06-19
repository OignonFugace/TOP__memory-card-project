import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";

function InfoGamePage({ handleBackToFrontPage }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="info-game-page">
      <div className="top-bar">
        <div className="top-bar-left-corner">
          <button onClick={handleBackToFrontPage}>{t("backToMenu")}</button>
        </div>
      </div>
      <main>
        <h1>{t("infoGameTitle")}</h1>
        <p>{t("infoGameDescription")}</p>
        <div>
          <p>{t("infoGameRule")}</p>
          <p className="info-game-rule">{t("rule")}</p>
        </div>
        <p><a href="https://github.com/OignonFugace/TOP__memory-card-project" target="_blank" rel="noopener">{t("infoGameGithub")}</a></p>
      </main>
    </div>
  );
}

export default InfoGamePage;
