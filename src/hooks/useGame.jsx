import { useContext, useEffect, useReducer } from "react";
import { trimFullDeck, shuffleDeck, getDisplayedCards } from "../utils/deck";
import { levels as levelsData } from "../data/levels";
import ThemeContext from "../context/ThemeContextProvider.jsx";
import {
  LOAD_GAME_THEME,
  SET_CURRENT_LEVEL_ID,
  LOAD_STAGE,
  SET_DISPLAYED_CARDS,
  SET_GAME_STATE,
  SET_STAGE_STATE,
  SELECT_CARD,
  OPEN_MODAL,
  CLOSE_MODAL,
  GAME_STATE_RUNNING,
  GAME_STATE_FINISHED,
  STAGE_STATE_RUNNING,
  LEVEL_STATE_CLOSED,
  LEVEL_STATE_OPEN,
  LEVEL_STATE_INPROGRESS,
} from "../utils/constants";

function gameReducer(state, action) {
  switch (action.type) {
    case LOAD_GAME_THEME: {
      const currentDeck =
        action.payload.themes[action.payload.currentTheme].deck;
      const highestLevelAchieved =
        action.payload.themes[action.payload.currentTheme].highestLevelAchieved;
      const levels = state.levels.map((level) =>
        level.id < highestLevelAchieved
          ? {
              ...level,
              state: LEVEL_STATE_OPEN,
            }
          : level.id > highestLevelAchieved
          ? {
              ...level,
              state: LEVEL_STATE_CLOSED,
            }
          : {
              ...level,
              state: LEVEL_STATE_INPROGRESS,
            }
      );
      return {
        ...state,
        currentDeck: currentDeck,
        highestLevelAchieved: highestLevelAchieved,
        levels: levels,
      };
    }

    case SET_CURRENT_LEVEL_ID: {
      return {
        ...state,
        currentLevelId: action.payload.currentLevelId,
        highestLevelAchieved: Math.max(
          state.highestLevelAchieved,
          action.payload.currentLevelId
        ),
      };
    }

    case LOAD_STAGE: {
      const shuffledDeck = shuffleDeck(state.currentDeck);
      const currentLevel = state.levels[state.currentLevelId - 1];
      const playingDeck = trimFullDeck(shuffledDeck, currentLevel).map(
        (card) => ({
          ...card,
          isClicked: false,
        })
      );
      const maxScore = playingDeck.length;
      return {
        ...state,
        playingDeck: playingDeck,
        score: 0,
        maxScore: maxScore,
      };
    }

    case SET_DISPLAYED_CARDS: {
      const totalDisplayedCards =
        state.levels[state.currentLevelId - 1].totalDisplayedCards;
      const displayedCards = getDisplayedCards(
        state.playingDeck,
        totalDisplayedCards
      );

      return {
        ...state,
        displayedCards: displayedCards,
      };
    }

    case SET_STAGE_STATE: {
      return {
        ...state,
        stageState: action.payload.state,
      };
    }

    case SET_GAME_STATE: {
      return {
        ...state,
        gameState: action.payload.state,
      };
    }

    case SELECT_CARD: {
      const playingDeck = state.playingDeck.map((card) =>
        card.id === action.payload.card.id ? { ...card, isClicked: true } : card
      );
      return {
        ...state,
        playingDeck: playingDeck,
        score: state.score + 1,
        bestScore: Math.max(state.bestScore, state.score + 1),
      };
    }

    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        modalCallback: action.payload.modalCallback,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
        modalCallback: null,
      };
    }

    default:
      throw new Error("Invalid action type: " + action.type);
  }
}

function useGame({ handleBackToFrontPage }) {
  const { themes, setThemes, currentTheme } = useContext(ThemeContext);

  const initialState = {
    currentDeck: [],
    playingDeck: [],
    displayedCards: [],
    levels: levelsData || [],
    currentLevelId: levelsData[0].id || null,
    highestLevelAchieved: null,
    gameState: GAME_STATE_RUNNING,
    stageState: STAGE_STATE_RUNNING,
    score: 0,
    maxScore: null,
    bestScore: 0,
    isModalOpen: false,
    modalCallback: null,
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    dispatch({
      type: LOAD_GAME_THEME,
      payload: { themes, currentTheme },
    });
  }, [currentTheme]);

  useEffect(() => {
    setThemes((prevThemes) => ({
      ...prevThemes,
      [currentTheme]: {
        ...prevThemes[currentTheme],
        highestLevelAchieved: state.highestLevelAchieved,
      },
    }));
  }, [state.highestLevelAchieved]);

  useEffect(() => {}, [state.modalCallback]);

  useEffect(() => {
    switch (state.stageState) {
      case "STAGE_STATE_RUNNING": {
        return;
      }

      case "STAGE_STATE_LOST": {
        dispatch({
          type: OPEN_MODAL,
          payload: {
            modalCallback: () => {
              dispatch({ type: LOAD_STAGE });
              dispatch({ type: SET_DISPLAYED_CARDS });
              dispatch({
                type: SET_STAGE_STATE,
                payload: { state: "STAGE_STATE_RUNNING" },
              });
            },
          },
        });
        break;
      }

      case "STAGE_STATE_WON": {
        if (state.currentLevelId === state.levels.length) {
          dispatch({
            type: SET_GAME_STATE,
            payload: { state: GAME_STATE_FINISHED },
          });
          dispatch({
            type: OPEN_MODAL,
            payload: { modalCallback: () => handleBackToFrontPage() },
          });
        } else {
          dispatch({
            type: OPEN_MODAL,
            payload: {
              modalCallback: () => {
                dispatch({
                  type: SET_CURRENT_LEVEL_ID,
                  payload: { currentLevelId: state.currentLevelId + 1 },
                });
                dispatch({ type: LOAD_STAGE });
                dispatch({ type: SET_DISPLAYED_CARDS });
                dispatch({
                  type: SET_STAGE_STATE,
                  payload: { state: "STAGE_STATE_RUNNING" },
                });
              },
            },
          });
        }
        break;
      }

      default:
        break;
    }
  }, [state.stageState]);

  return {
    displayedCards: state.displayedCards,
    currentDeck: state.currentDeck,
    levels: state.levels,
    currentLevelId: state.currentLevelId,
    score: state.score,
    maxScore: state.maxScore,
    bestScore: state.bestScore,

    gameState: state.gameState,
    stageState: state.stageState,
    isModalOpen: state.isModalOpen,
    modalCallback: state.modalCallback,

    handleBackToFrontPage,
    dispatch,
  };
}

export default useGame;

