import React from 'react';
import { useGameState } from '../hooks';

import styles from './Game.module.css';

const Scoreboard: React.FC = () => {
  const { gameState, dispatch } = useGameState();

  if (gameState?.username === null) {
    return <></>;
  }

  return (
    <div className={styles.scoreboardContainer} data-testid="scoreboard">
      <div>Hello {gameState.username}</div>
      <div>Score: {gameState.currentScore}</div>
      <div className={styles.controls}>
        <button
          className={styles.gameButton}
          onClick={() => dispatch({ type: 'RESET_GAME' })}
        >
          Reset Game
        </button>
        <button
          className={styles.gameButton}
          onClick={() => dispatch({ type: 'LEAVE_GAME' })}
        >
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
