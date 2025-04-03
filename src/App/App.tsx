import automataLogo from '../assets/automata.png';
import Game from '../Game/Game';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div>
        <a href="https://automata.tech/" target="_blank" rel="noreferrer">
          <img
            src={String(automataLogo)}
            className="logo automata"
            alt="Automata logo"
          />
        </a>
      </div>
      <h1>Frontend Exercise</h1>
      <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
      <Game />
    </div>
  );
};

export default App;
