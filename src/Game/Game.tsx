import './Game.css';
import UsernameForm from './UsernameInput';
import PlayGame from './PlayGame';
import { useGameState } from '../hooks';
import Scoreboard from './Scoreboard';

const Game: React.FC = () => {
  const { gameState } = useGameState();

  return (
    <div className="game-container">
      {gameState && gameState.username !== null ? (
        <>
          <Scoreboard />
          <PlayGame />
        </>
      ) : (
        <UsernameForm />
      )}
    </div>
  );
};

export default Game;
