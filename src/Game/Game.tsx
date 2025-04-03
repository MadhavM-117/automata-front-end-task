import './Game.css';
import UsernameInput from './UsernameInput';
import PlayGame from './PlayGame';
import { useGameState } from '../hooks';

const Game: React.FC = () => {
  const { gameState, dispatch } = useGameState();

  return (
    <div className="game-container">
      {gameState && gameState.username !== null ? (
        <PlayGame />
      ) : (
        <UsernameInput
          onUsernameSubmit={(username) => {
            if (username.trim())
              dispatch({ type: 'SET_USERNAME', payload: username });
          }}
        />
      )}
    </div>
  );
};

export default Game;
