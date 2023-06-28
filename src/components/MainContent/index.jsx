import { useContext } from "react";
import InfoGamePage from "../../pages/InfoGamePage";
import FrontPage from "../../pages/FrontPage";
import GamePage from "../../pages/GamePage";
import AppContext from "../../context/AppContextProvider";

function MainContent() {
	const { isGameStarted, isInfoGamePageOpen, setIsGameStarted } = useContext(AppContext);

	return (
		<>
			{!isGameStarted ? (
				isInfoGamePageOpen ? (
					<InfoGamePage />
				) : (
					<FrontPage initiateGame={() => setIsGameStarted(true)} />
				)
			) : (
				<GamePage />
			)}
		</>
	)
}

export default MainContent;
