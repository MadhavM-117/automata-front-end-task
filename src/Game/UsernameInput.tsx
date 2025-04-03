import React, { FormEvent } from 'react';
import './Game.css';

interface UsernameInputProps {
  onUsernameSubmit: (username: string) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ onUsernameSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get('username') ?? '';

    if (typeof username === 'string' && username.trim()) {
      onUsernameSubmit(username);
    }
  };

  return (
    <div className="username-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          required
        />
        <button type="submit" className="game-button">
          {"Let's go!"}
        </button>
      </form>
    </div>
  );
};

export default UsernameInput;
