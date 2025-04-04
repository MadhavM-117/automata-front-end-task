import { createContext, useContext } from 'react';
import { InternalGameState, TurnOption } from './models';
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
  | { type: 'RESET_TURN_HISTORY' }
  | { type: 'RESET_GAME' };

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
