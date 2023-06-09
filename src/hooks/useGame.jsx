import { useEffect, useState } from "react";
import { fullDeck as fullDeckData } from "../data/cardList";
import { trimFullDeck, shuffleDeck, getDisplayedCards } from "../utils/deck";
import { levels as levelsData } from "../data/levels";

function useGame({ handleBackToFrontPage }) {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [playingDeck, setPlayingDeck] = useState(null);
  const [displayedCards, setDisplayedCards] = useState(null);
  const [levels, setLevels] = useState(levelsData || null);
  const [currentLevelId, setCurrentLevelId] = useState(
    levelsData[0].id || null
  );
  const [levelPassed, setLevelPassed] = useState(false);
  const [gameState, setGameState] = useState("running");
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCallback, setModalCallback] = useState(null);

  const openModal = (callback) => {
    setIsModalOpen(true);
    setModalCallback(() => callback);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    if (modalCallback) {
      modalCallback();
      setModalCallback(null);
    }
  };

  useEffect(() => {
    setCurrentDeck(fullDeckData);
    setLevels((prevLevels) =>
      prevLevels.map((level) => ({
        ...level,
        state: "closed",
      }))
    );
  }, []);

  useEffect(() => {
    if (currentDeck && currentLevelId) {
      const shuffledDeck = shuffleDeck(currentDeck);
      setPlayingDeck(() =>
        trimFullDeck(shuffledDeck, levels[currentLevelId - 1]).map((card) => ({
          ...card,
          isClicked: false,
        }))
      );
    }
  }, [currentDeck, currentLevelId]);

  useEffect(() => {
    if (playingDeck) {
      setMaxScore(playingDeck?.length);
      setDisplayedCards(
        getDisplayedCards(
          playingDeck,
          levels[currentLevelId - 1].totalDisplayedCards
        )
      );
    }
  }, [playingDeck]);

  useEffect(() => {
    if (score === maxScore) {
      setGameState("won");
    }

    setBestScore((prevBestScore) => prevBestScore > score ? prevBestScore : score);
  }, [score, maxScore]);

  useEffect(() => {
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.id === currentLevelId
          ? {
              ...level,
              state: "inProgress",
            }
          : level
      )
    );
  }, [currentLevelId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (levelPassed) {
      if (currentLevelId < levels.length) {
        setCurrentLevelId((prevCurrentLevelId) => prevCurrentLevelId + 1);
      } else {
        setGameState("finished");
      }
      setLevelPassed(false);
    }
  }, [levelPassed]);

  function markCurrentLevelAsPassed() {
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.id === currentLevelId ? { ...level, state: "passed" } : level
      )
    );
    setLevelPassed(true);
  }

  useEffect(() => {
    if (gameState === "finished") {
      openModal(() => {
        handleBackToFrontPage();
      })
    } else if (gameState === "lost") {
      openModal()
    } else if (gameState === "won") {
      if (currentLevelId >= levels.length) {
        markCurrentLevelAsPassed();
        return;
      };
      openModal(markCurrentLevelAsPassed);
    }
  }, [gameState]);

  function updateSelectedCard(card) {
    if (card.isClicked) return false;

    setPlayingDeck((prevPlayingDeck) =>
      shuffleDeck(
        prevPlayingDeck.map((cardObject) =>
          cardObject.id === card.id
            ? { ...cardObject, isClicked: true }
            : cardObject
        )
      )
    );

    return true;
  }

  function handleCardClick(card) {
    const canIncreaseScore = updateSelectedCard(card);

    if (!canIncreaseScore) {
      setGameState("lost");
      return;
    }

    setScore((prevScore) => prevScore + 1);
  }

  function resetGame() {
    setCurrentDeck([...fullDeckData]);
    setGameState("running");
    setScore(0);
  }

  return {
    displayedCards,
    setPlayingDeck,
    currentDeck,
    levels,
    currentLevelId,
    setCurrentLevelId,
    score,
    setScore,
    maxScore,
    bestScore,
    handleCardClick,
    gameState,
    resetGame,
    isModalOpen,
    closeModal,
    handleBackToFrontPage,
  };
}

export default useGame;
