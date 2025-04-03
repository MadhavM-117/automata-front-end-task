import { useEffect, useState } from 'react';
import './Game.css';
import { getGameState } from '../lib/storage';
import { InternalGameState } from '../models';
import UsernameInput from './UsernameInput';
import PlayGame from './PlayGame';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<InternalGameState | undefined>();

  useEffect(() => {
    setGameState(getGameState());
  }, []);

  return (
    <div className="game-container">
      {gameState && gameState.username !== null ? (
        <PlayGame />
      ) : (
        <UsernameInput onUsernameSubmit={console.log} />
      )}
    </div>
  );
};

export default Game;
