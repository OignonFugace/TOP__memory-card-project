import { useContext, useEffect, useReducer } from "react";
import { trimFullDeck, shuffleDeck, getDisplayedCards } from "../utils/deck";
import { levels as levelsData } from "../data/levels";
import ThemeContext from "../context/ThemeContextProvider.jsx";

const START_GAME = "START_GAME";
const RESET_STAGE = "RESET_STAGE";
const SET_INITIAL_CURRENT_LEVEL_ID = "SET_INITIAL_CURRENT_LEVEL_ID";
const LAUNCH_STAGE = "LAUNCH_STAGE";
const INITIATE_LEVELS = "INITIATE_LEVELS";
const SET_HIGHEST_LEVEL_ACHIEVED = "SET_HIGHEST_LEVEL_ACHIEVED";
const PASS_LEVEL = "PASS_LEVEL";
const SELECT_CARD = "SELECT_CARD";
const DISPLAY_CARDS = "DISPLAY_CARDS";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const GAME_STATE_RUNNING = "GAME_STATE_RUNNING";
const GAME_STATE_FINISHED = "GAME_STATE_FINISHED";

const STAGE_STATE_RUNNING = "STAGE_STATE_RUNNING";
const STAGE_STATE_LOST = "STAGE_STATE_LOST";
const STAGE_STATE_WON = "STAGE_STATE_WON";

const LEVEL_STATE_CLOSED = "LEVEL_STATE_CLOSED";
const LEVEL_STATE_OPEN = "LEVEL_STATE_OPEN";
const LEVEL_STATE_PASSED = "LEVEL_STATE_PASSED";
const LEVEL_STATE_INPROGRESS = "LEVEL_STATE_INPROGRESS";

function deckReducer(state, action) {
  switch (action.type) {
    case LAUNCH_STAGE:
      return {
        ...state,
        playingDeck: action.payload.playingDeck,
        displayedCards: action.payload.displayedCards,
      };

    case SELECT_CARD:
      if (action.payload.isClicked) return state;
      const newPlayingDeck = state.playingDeck.map((card) =>
        card.id === action.payload.id ? { ...card, isClicked: true } : card
      );
      return {
        ...state,
        playingDeck: newPlayingDeck,
      };

    case DISPLAY_CARDS:
      const newShuffledPlayingDeck = shuffleDeck(state.playingDeck);
      const newDisplayedCards = getDisplayedCards(
        newShuffledPlayingDeck,
        action.totalDisplayedCards
      );
      return {
        ...state,
        playingDeck: newShuffledPlayingDeck,
        displayedCards: newDisplayedCards,
      };

    case RESET_STAGE:
      return {
        ...state,
        playingDeck: state.playingDeck?.map((card) => ({
          ...card,
          isClicked: false,
        })),
      };

    default:
      return state;
  }
}

function levelReducer(state, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        levels: state.levels.map((level) => ({
          ...level,
          state: LEVEL_STATE_CLOSED,
        })),
      };

    case SET_INITIAL_CURRENT_LEVEL_ID:
      return {
        ...state,
        currentLevelId: action.payload.currentLevelId,
      };

    case SET_HIGHEST_LEVEL_ACHIEVED:
      return {
        ...state,
        highestLevelAchievedCopy: action.payload,
      };

    case INITIATE_LEVELS:
      return {
        ...state,
        levels: state.levels.map((level) =>
          level.id < action.highestLevelAchievedCopy
            ? {
                ...level,
                state: LEVEL_STATE_OPEN,
              }
            : level.id > action.highestLevelAchievedCopy
            ? {
                ...level,
                state: LEVEL_STATE_CLOSED,
              }
            : {
                ...level,
                state: LEVEL_STATE_INPROGRESS,
              }
        ),
      };

    case PASS_LEVEL:
      let newCurrentLevelId = state.currentLevelId;
      let newGameState = state.gameState;
      let newHighestLevelAchieved = state.highestLevelAchievedCopy;

      if (state.currentLevelId < state.levels.length) {
        newCurrentLevelId = state.currentLevelId + 1;
        newHighestLevelAchieved =
          state.highestLevelAchievedCopy === state.currentLevelId
            ? state.highestLevelAchievedCopy + 1
            : state.highestLevelAchievedCopy;
      } else {
        newGameState = GAME_STATE_FINISHED;
      }

      const newLevels = state.levels.map((level) =>
        level.id === state.currentLevelId
          ? { ...level, state: LEVEL_STATE_PASSED }
          : level.id === newCurrentLevelId
          ? { ...level, state: LEVEL_STATE_INPROGRESS }
          : level
      );

      return {
        ...state,
        levels: newLevels,
        currentLevelId: newCurrentLevelId,
        gameState: newGameState,
        highestLevelAchievedCopy: newHighestLevelAchieved,
      };

    default:
      return state;
  }
}

function scoreReducer(state, action) {
  switch (action.type) {
    case SELECT_CARD:
      if (action.payload.isClicked) {
        console.log("Triggered");
        return {
          ...state,
          stageState: STAGE_STATE_LOST,
        };
      }
      const newScore = state.score + 1;
      const newBestScore = Math.max(state.score + 1, state.bestScore);
      const newStageState =
        newScore === state.maxScore ? STAGE_STATE_WON : state.stageState;
      return {
        ...state,
        score: newScore,
        bestScore: newBestScore,
        stageState: newStageState,
      };

    case LAUNCH_STAGE:
      return {
        ...state,
        maxScore: action.payload.maxScore,
      };

    case RESET_STAGE:
      return {
        ...state,
        score: 0,
        stageState: STAGE_STATE_RUNNING,
      };

    default:
      return state;
  }
}

function modalReducer(state, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalCallback: action.payload,
      };

    case CLOSE_MODAL:
      if (state.modalCallback) {
        state.modalCallback();
      }
      return {
        ...state,
        isModalOpen: false,
        modalCallback: null,
      };

    default:
      return state;
  }
}

function gameReducer(state, action) {
  return {
    deck: deckReducer(state.deck, action),
    levels: levelReducer(state.levels, action),
    score: scoreReducer(state.score, action),
    modal: modalReducer(state.modal, action),
  };
}

function useGame({ handleBackToFrontPage }) {
  const { currentDeck, highestLevelAchieved, setHighestLevelAchieved } =
    useContext(ThemeContext);

  const initialState = {
    deck: {
      playingDeck: null,
      displayedCards: null,
    },
    levels: {
      levels: levelsData || null,
      currentLevelId: levelsData[0].id || null,
      highestLevelAchievedCopy: null,
    },
    score: {
      gameState: GAME_STATE_RUNNING,
      stageState: STAGE_STATE_RUNNING,
      score: 0,
      maxScore: null,
      bestScore: null,
    },
    modal: {
      isModalOpen: false,
      modalCallback: null,
    },
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    dispatch({ type: START_GAME });
  }, []);

  useEffect(() => {
    if (currentDeck && state.levels.currentLevelId) {
      const shuffledDeck = shuffleDeck(currentDeck);
      const currentLevel = state.levels.levels[state.levels.currentLevelId - 1];

      const totalDisplayedCards =
        state.levels.levels[state.levels.currentLevelId - 1]
          .totalDisplayedCards;
      const playingDeck = trimFullDeck(shuffledDeck, currentLevel).map(
        (card) => ({
          ...card,
          isClicked: false,
        })
      );

      dispatch({
        type: LAUNCH_STAGE,
        payload: {
          playingDeck: playingDeck,
          displayedCards: getDisplayedCards(playingDeck, totalDisplayedCards),
          maxScore: playingDeck.length,
        },
      });
    }
  }, [currentDeck, state.levels.currentLevelId]);

  useEffect(() => {
    const stageState = state.score.stageState;
    const gameState = state.score.gameState;

    if (gameState === GAME_STATE_FINISHED) {
      dispatch({ type: OPEN_MODAL, payload: handleBackToFrontPage });
    } else if (stageState === STAGE_STATE_LOST) {
      dispatch({ type: OPEN_MODAL });
      dispatch({
        type: DISPLAY_CARDS,
        totalDisplayedCards:
          state.levels.levels[state.levels.currentLevelId - 1]
            .totalDisplayedCards,
      });
      dispatch({ type: RESET_STAGE });
      dispatch({ type: DISPLAY_CARDS });
    } else if (stageState === STAGE_STATE_WON) {
      if (state.levels.currentLevelId >= state.levels.levels.length) {
        dispatch({
          type: PASS_LEVEL,
          highestLevelAchieved: state.levels.highestLevelAchievedCopy,
        });
      }
      dispatch({
        type: PASS_LEVEL,
        highestLevelAchieved: state.levels.highestLevelAchievedCopy,
      });
      // dispatch({
      //   type: OPEN_MODAL,
      //   payload: () =>
      //     dispatch({ type: PASS_LEVEL, payload: setHighestLevelAchieved }),
      // });
    }
  }, [state.score.stageState, state.score.gameState]);

  useEffect(() => {
    dispatch({
      type: SET_HIGHEST_LEVEL_ACHIEVED,
      payload: highestLevelAchieved,
    });
  }, [highestLevelAchieved]);

  useEffect(() => {
    dispatch({
      type: INITIATE_LEVELS,
      highestLevelAchievedCopy: state.levels.highestLevelAchievedCopy,
    });
    setHighestLevelAchieved(state.levels.highestLevelAchievedCopy);
  }, [state.levels.highestLevelAchievedCopy]);

  return {
    displayedCards: state.deck.displayedCards,
    currentDeck: state.deck.currentDeck,
    levels: state.levels.levels,
    currentLevelId: state.levels.currentLevelId,
    score: state.score.score,
    maxScore: state.score.maxScore,
    bestScore: state.score.bestScore,

    gameState: state.score.gameState,
    stageState: state.score.stageState,
    isModalOpen: state.modal.isModalOpen,

    handleBackToFrontPage,
    dispatch,
  };
}

export default useGame;
