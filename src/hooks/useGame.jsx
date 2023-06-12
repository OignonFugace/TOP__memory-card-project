import { useContext, useEffect, useReducer, useState } from "react";
import { trimFullDeck, shuffleDeck, getDisplayedCards } from "../utils/deck";
import { levels as levelsData } from "../data/levels";
import ThemeContext from "../context/ThemeContextProvider.jsx";

const START_GAME = "START_GAME";
const PASS_LEVEL = "PASS_LEVEL";
const SELECT_CARD = "SELECT_CARD";
const HANDLE_CARD_CLICK = "HANDLE_CARD_CLICK";

function gameReducer(state, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state, 
        gameState: "running",
        score: 0,
        currentDeck: action.payload,
      };

    case PASS_LEVEL:
      return {

      };

    case SELECT_CARD:
      return {

      };

    case HANDLE_CARD_CLICK:
      if (action.card.isClicked) {

      }
      const canIncreaseScore = updateSelectedCard(card);
      
      return {

      };


    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useGame({ handleBackToFrontPage }) {
  const {
    currentDeck,
    setCurrentDeck,
    highestLevelAchieved,
    setHighestLevelAchieved,
  } = useContext(ThemeContext);

  const initialState = {
    currentDeck: currentDeck,
    playingDeck: null,
    displayedCards: null,
    levels: levelsData || null,
    currentLevelId: levelsData[0].id || null,
    highestLevelAchieved: highestLevelAchieved,
    levelPassed: false,
    gameState: "running",
    score: 0,
    maxScore: null,
    bestScore: null,
    isModalOpen: false,
    modalCallback: null,
  }

  const [state, dispatch] = useReducer(gameReducer, initialState);

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

  useEffect(() => {
    setLevels(prevLevels =>
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
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.id < highestLevelAchieved
          ? {
              ...level,
              state: "open",
            }
          : level.id > highestLevelAchieved
          ? {
              ...level,
              state: "closed",
            }
          : {
              ...level,
              state: "inProgress",
            }
      )
    );
  }, [highestLevelAchieved]);

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

    setBestScore((prevBestScore) =>
      prevBestScore > score ? prevBestScore : score
    );
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

  useEffect(() => {
    if (levelPassed) {
      if (currentLevelId < levels.length) {
        setCurrentLevelId((prevCurrentLevelId) => prevCurrentLevelId + 1);
        setHighestLevelAchieved((prevHighestLevelAchieved) =>
          prevHighestLevelAchieved === currentLevelId
            ? prevHighestLevelAchieved + 1
            : prevHighestLevelAchieved
        );
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
      });
    } else if (gameState === "lost") {
      openModal();
    } else if (gameState === "won") {
      if (currentLevelId >= levels.length) {
        markCurrentLevelAsPassed();
        return;
      }
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
    dispatch({ type: "START_GAME", payload: [...currentDeck] });
  }

  const openModal = (callback) => {
    setIsModalOpen(true);
    setModalCallback(() => callback);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalCallback) {
      modalCallback();
      setModalCallback(null);
    }
  };

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
