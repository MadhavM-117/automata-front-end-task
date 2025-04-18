/* Manage storage of browser state in local storage */

import { InternalGameState, TurnOption } from '../models';

export const isValidTurn = (value: string): value is TurnOption => {
  return ['scissors', 'paper', 'rock', 'lizard', 'spock'].includes(
    value as TurnOption,
  );
};

export const isValidTurnHistory = (arr: unknown[]): arr is TurnOption[] => {
  return arr.every((turn) => {
    return typeof turn === 'string' && isValidTurn(turn);
  });
};

export const extractValidScore = (score: string | null): number => {
  let currentScore = 0;

  try {
    if (score !== null) {
      const savedScore = parseInt(score, 10);
      if (!isNaN(savedScore)) {
        currentScore = savedScore;
      }
    }
  } catch (error) {
    console.error('Error while extracting score.', error);
    currentScore = 0;
  }

  return currentScore;
};

export const extractValidTurnHistory = (
  savedHistory: string | null,
): TurnOption[] => {
  let turnHistory: TurnOption[] = [];

  try {
    if (savedHistory !== null) {
      const extractedTurns: unknown = JSON.parse(savedHistory);
      if (Array.isArray(extractedTurns) && isValidTurnHistory(extractedTurns)) {
        turnHistory = extractedTurns;
      }
    }
  } catch (error) {
    console.error('Error while extracting turn history.', error);
    turnHistory = [];
  }

  return turnHistory;
};

export const getGameState = (): InternalGameState => {
  return {
    username: localStorage.getItem('automata-username'),
    currentScore: extractValidScore(localStorage.getItem('automata-score')),
    playerTurnHistory: extractValidTurnHistory(
      localStorage.getItem('automata-turn-history'),
    ),
  };
};

export const setUsername = (username: string | null): void => {
  if (username !== null) {
    localStorage.setItem('automata-username', username);
  } else {
    localStorage.removeItem('automata-username');
  }
};

export const setScore = (score: number): void => {
  // Ensure score is a valid number
  if (typeof score === 'number' && !isNaN(score)) {
    localStorage.setItem('automata-score', score.toString());
  }
};

export const setTurnHistory = (turnHistory: TurnOption[]): void => {
  // Validate the turn history before saving
  if (Array.isArray(turnHistory) && isValidTurnHistory(turnHistory)) {
    localStorage.setItem('automata-turn-history', JSON.stringify(turnHistory));
  }
};

export const setGameState = ({
  username,
  currentScore,
  playerTurnHistory,
}: InternalGameState): void => {
  setUsername(username);
  setScore(currentScore);
  setTurnHistory(playerTurnHistory);
};
