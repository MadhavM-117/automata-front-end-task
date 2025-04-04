import { useGameState } from '../hooks';

const Scoreboard: React.FC = () => {
  const { gameState, dispatch } = useGameState();

  if (gameState?.username === null) {
    return <></>;
  }

  return (
    <div className="scoreboard-container" data-testid="scoreboard">
      <div>Hello {gameState.username}</div>
      <div>Score: {gameState.currentScore}</div>
      <button
        className="game-button"
        onClick={() => dispatch({ type: 'RESET_GAME' })}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Scoreboard;
