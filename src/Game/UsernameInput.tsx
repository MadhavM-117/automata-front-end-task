import React, { FormEvent, useCallback } from 'react';
import './Game.css';
import { useGameState } from '../hooks';

const UsernameInput: React.FC = () => {
  const { dispatch } = useGameState();
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const form = new FormData(e.currentTarget);
      const username = form.get('username') ?? '';

      if (typeof username === 'string' && username.trim()) {
        dispatch({ type: 'SET_USERNAME', payload: username });
      }
    },
    [dispatch],
  );

  return (
    <div className="username-form-container" data-testid="username-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          required
          data-testid="username-input"
        />
        <button
          type="submit"
          className="game-button"
          data-testid="username-submit"
        >
          {"Let's go!"}
        </button>
      </form>
    </div>
  );
};

export default UsernameInput;
