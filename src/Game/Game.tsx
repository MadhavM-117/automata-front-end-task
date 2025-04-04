import UsernameForm from './UsernameInput';
import PlayGame from './PlayGame';
import { useGameState } from '../hooks';
import Scoreboard from './Scoreboard';

import styles from './Game.module.css';

const Game: React.FC = () => {
  const { gameState } = useGameState();

  return (
    <div className={styles.gameContainer}>
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
