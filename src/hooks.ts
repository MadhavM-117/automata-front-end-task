import { createContext, useContext } from 'react';
import { InternalGameState, TurnOption, TurnResult } from './models';
import {
  setGameState,
  setScore,
  setTurnHistory,
  setUsername,
} from './lib/storage';

// Action types
export type GameAction =
  | { type: 'SET_USERNAME'; payload: string | null }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'RESET_SCORE' }
  | { type: 'ADD_TURN'; payload: TurnOption }
  | { type: 'ADD_PLAY_RESULT'; payload: TurnResult }
  | { type: 'RESET_TURN_HISTORY' }
  | { type: 'RESET_GAME' }
  | { type: 'LEAVE_GAME' };

// Reducer function for game state
export const gameReducer = (
  state: InternalGameState,
  action: GameAction,
): InternalGameState => {
  switch (action.type) {
    case 'SET_USERNAME': {
      setUsername(action.payload);
      return { ...state, username: action.payload };
    }

    case 'SET_SCORE': {
      setScore(action.payload);
      return { ...state, currentScore: action.payload };
    }

    case 'RESET_SCORE': {
      setScore(0);
      return { ...state, currentScore: 0 };
    }

    case 'ADD_TURN': {
      const newTurnHistory = [...state.playerTurnHistory, action.payload];
      setTurnHistory(newTurnHistory);
      return { ...state, playerTurnHistory: newTurnHistory };
    }

    case 'ADD_PLAY_RESULT': {
      const { playerChoice, outcome } = action.payload;

      const newTurnHistory = [...state.playerTurnHistory, playerChoice];
      setTurnHistory(newTurnHistory);

      let score = state.currentScore;
      switch (outcome) {
        case 'win': {
          score = score + 1;
          break;
        }
        case 'lose': {
          score = score - 1;
          break;
        }
        default:
          break;
      }
      setScore(score);

      return {
        ...state,
        playerTurnHistory: newTurnHistory,
        currentScore: score,
      };
    }

    case 'RESET_TURN_HISTORY': {
      setTurnHistory([]);
      return { ...state, playerTurnHistory: [] };
    }

    case 'RESET_GAME': {
      const resetState = {
        ...state,
        currentScore: 0,
        playerTurnHistory: [],
      };
      setGameState(resetState);
      return resetState;
    }

    case 'LEAVE_GAME': {
      const resetState = {
        username: null,
        currentScore: 0,
        playerTurnHistory: [],
      };
      setGameState(resetState);
      return resetState;
    }

    default:
      return state;
  }
};

export const GameStateContext = createContext<{
  gameState: InternalGameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  gameState: { username: null, currentScore: 0, playerTurnHistory: [] },
  dispatch: () => {
    console.error(
      'This function should not be called. Something has gone wrong.',
    );
  },
});

// Custom hook to provide game state and dispatch function
export const useGameState = () => {
  return useContext(GameStateContext);
};
