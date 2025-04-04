import React, { useEffect, useState } from 'react';
import { TurnResult } from '../models';
import { playTurn } from '../lib/game';
import { useGameState } from '../hooks';

const PlayGame: React.FC = () => {
  const { dispatch } = useGameState();
  const [turnResult, setTurnResult] = useState<TurnResult | undefined>();

  useEffect(() => {
    if (turnResult) {
      dispatch({ type: 'ADD_PLAY_RESULT', payload: turnResult });
    }
  }, [turnResult, dispatch]);

  return (
    <div className="play-container" data-testid="play-game">
      {turnResult ? (
        <div data-testid="turn-result">
          <div className="game-outcome" data-outcome={turnResult.outcome}>
            {turnResult.reason}
          </div>
          <button onClick={() => setTurnResult(undefined)}>Again!</button>
        </div>
      ) : (
        <div className="play-turn-container" data-testid="play-turn">
          <button onClick={() => setTurnResult(playTurn('rock'))}>Rock</button>
          <button onClick={() => setTurnResult(playTurn('paper'))}>
            Paper
          </button>
          <button onClick={() => setTurnResult(playTurn('scissors'))}>
            Scissors
          </button>
          <button onClick={() => setTurnResult(playTurn('lizard'))}>
            Lizard
          </button>
          <button onClick={() => setTurnResult(playTurn('spock'))}>
            Spock
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayGame;
