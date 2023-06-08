import { useEffect, useState } from "react"; import { fullDeck as fullDeckData } from "../data/cardList";
import { trimFullDeck, shuffleDeck, getDisplayedCards } from "../utils/deck";
import { levels as levelsData } from "../data/levels";

function useGame() {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [playingDeck, setPlayingDeck] = useState(null);
  const [displayedCards, setDisplayedCards] = useState(null);
  const [levels, setLevels] = useState(levelsData || null);
  const [currentLevel, setCurrentLevel] = useState(levelsData[0] || null);
  const [levelPassed, setLevelPassed] = useState(false);
  const [gameState, setGameState] = useState("running");
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(null);

  useEffect(() => {
    setCurrentDeck(fullDeckData);
  }, []);

  useEffect(() => {
    if (currentDeck && currentLevel) {
      const shuffledDeck = shuffleDeck(currentDeck);
      const currentLevelId = currentLevel.id;
      setPlayingDeck(() => 
        trimFullDeck(shuffledDeck, currentLevelId).map((card) => ({
          ...card,
          isClicked: false,
        }))
      );
    }
  }, [currentDeck, currentLevel]);

  useEffect(() => {
    if (playingDeck) {
      setMaxScore(playingDeck?.length);
      setDisplayedCards(getDisplayedCards(playingDeck, currentLevel.totalDisplayedCards));
    }
  }, [playingDeck]);

  useEffect(() => {
    if (score === maxScore) {
      setGameState("won");
      setLevelPassed(true);
    }
  }, [score, maxScore]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (levelPassed) {
      if (currentLevel.id < levels.length) {
        setCurrentLevel(prevCurrentLevel => levels[prevCurrentLevel.id]);
      } else {
        alert("Well, you are best : you finished the game !");
      }
      setLevelPassed(false);
    }
  }, [levelPassed])

  useEffect(() => {
    if (gameState === "lost") {
      alert("Game Over...");
      resetGame();
    } else if (gameState === "won") {
      alert("You Won! Great For You.");
      resetGame();
    }
  }, [gameState]);

  function updateSelectedCard(card) {
    if (card.isClicked) return false;

    setPlayingDeck(prevPlayingDeck =>
      shuffleDeck(prevPlayingDeck.map(cardObject =>
        cardObject.id === card.id ? { ...cardObject, isClicked: true } : cardObject
      )
    ));

    return true;
  }

  function handleCardClick(card) {
    const canIncreaseScore = updateSelectedCard(card);

    if (!canIncreaseScore) {
      setGameState("lost");
      return;
    }

    setScore(prevScore => prevScore + 1);
  }

  function resetGame() {
    setCurrentDeck([...fullDeckData]);
    setGameState("running");
    setScore(0);
  }

  return { 
    playingDeck, 
    setPlayingDeck, 
    currentDeck, 
    levels,
    currentLevel, 
    setCurrentLevel ,
    score,
    setScore,
    maxScore,
    handleCardClick,
    gameState,
    resetGame,
  };
}

export default useGame;
