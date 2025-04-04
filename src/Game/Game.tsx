import './Game.css';
import UsernameInput from './UsernameInput';
import PlayGame from './PlayGame';
import { useGameState } from '../hooks';

const Game: React.FC = () => {
  const { gameState } = useGameState();

  return (
    <div className="game-container">
      {gameState && gameState.username !== null ? (
        <PlayGame />
      ) : (
        <UsernameInput />
      )}
    </div>
  );
};

export default Game;
