import automataLogo from '../assets/automata.png';
import './App.css';

function App() {
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
    </div>
  );
}

export default App;
