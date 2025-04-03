import React, { useReducer } from 'react';
import { gameReducer, GameStateContext } from '../hooks';
import { getGameState } from '../lib/storage';

const GameStateProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, dispatch] = useReducer(gameReducer, getGameState());

  return (
    <GameStateContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
