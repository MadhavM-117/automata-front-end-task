import React, { FormEvent, useCallback } from 'react';
import { useGameState } from '../hooks';

import styles from './Game.module.css';

const UsernameForm: React.FC = () => {
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
    <div className={styles.usernameFormContainer} data-testid="username-form">
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
          className={styles.gameButton}
          data-testid="username-submit"
        >
          {"Let's go!"}
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
