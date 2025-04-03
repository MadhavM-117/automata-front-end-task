import { describe, it, expect, vi, beforeEach } from 'vitest';
import { determineTurnOutcome, playTurn } from './game';
import { getGameState, setGameState } from './storage';
import * as evilComputer from './evilComputer';
import { TurnOption, InternalGameState } from '../models';

// Mock the storage module
vi.mock(import('./storage'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getGameState: vi.fn(),
    setGameState: vi.fn(),
  };
});

// Mock the evilComputer module
vi.mock(import('./evilComputer'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getComputerChoice: vi.fn(),
  };
});

describe('game', () => {
  describe('determineTurnOutcome', () => {
    it('should determine a tie when both choices are the same', () => {
      const result = determineTurnOutcome('rock', 'rock');
      expect(result.outcome).toBe('tie');
      expect(result.playerChoice).toBe('rock');
      expect(result.computerChoice).toBe('rock');
      expect(result.reason).toContain('Tie');
    });

    it('should determine player win when player choice beats computer choice', () => {
      // Test a few combinations
      const rockBeatsScissors = determineTurnOutcome('rock', 'scissors');
      expect(rockBeatsScissors.outcome).toBe('win');
      expect(rockBeatsScissors.reason).toContain('Rock crushes Scissors');

      const paperBeatsRock = determineTurnOutcome('paper', 'rock');
      expect(paperBeatsRock.outcome).toBe('win');
      expect(paperBeatsRock.reason).toContain('Paper covers Rock');

      const scissorsBeatsPaper = determineTurnOutcome('scissors', 'paper');
      expect(scissorsBeatsPaper.outcome).toBe('win');
      expect(scissorsBeatsPaper.reason).toContain('Scissors cuts Paper');

      const lizardBeatsSpock = determineTurnOutcome('lizard', 'spock');
      expect(lizardBeatsSpock.outcome).toBe('win');
      expect(lizardBeatsSpock.reason).toContain('Lizard poisons Spock');

      const spockBeatsScissors = determineTurnOutcome('spock', 'scissors');
      expect(spockBeatsScissors.outcome).toBe('win');
      expect(spockBeatsScissors.reason).toContain('Spock smashes Scissors');
    });

    it('should determine computer win when computer choice beats player choice', () => {
      // Test a few combinations
      const scissorsLosesToRock = determineTurnOutcome('scissors', 'rock');
      expect(scissorsLosesToRock.outcome).toBe('lose');
      expect(scissorsLosesToRock.reason).toContain('Rock crushes Scissors');

      const rockLosesToPaper = determineTurnOutcome('rock', 'paper');
      expect(rockLosesToPaper.outcome).toBe('lose');
      expect(rockLosesToPaper.reason).toContain('Paper covers Rock');

      const paperLosesToScissors = determineTurnOutcome('paper', 'scissors');
      expect(paperLosesToScissors.outcome).toBe('lose');
      expect(paperLosesToScissors.reason).toContain('Scissors cuts Paper');

      const spockLosesToLizard = determineTurnOutcome('spock', 'lizard');
      expect(spockLosesToLizard.outcome).toBe('lose');
      expect(spockLosesToLizard.reason).toContain('Lizard poisons Spock');

      const scissorsLosesToSpock = determineTurnOutcome('scissors', 'spock');
      expect(scissorsLosesToSpock.outcome).toBe('lose');
      expect(scissorsLosesToSpock.reason).toContain('Spock smashes Scissors');
    });
  });

  describe('playTurn', () => {
    let mockGameState: InternalGameState;

    beforeEach(() => {
      // Reset mocks
      vi.clearAllMocks();

      // Setup mock game state
      mockGameState = {
        username: 'TestUser',
        currentScore: 10,
        playerTurnHistory: ['rock', 'paper'] as TurnOption[],
      };

      // Setup mock return values
      vi.mocked(getGameState).mockReturnValue(mockGameState);
      vi.mocked(evilComputer.getComputerChoice).mockReturnValue('scissors');
    });

    it('should call getComputerChoice to get computer choice', () => {
      playTurn('rock');
      expect(evilComputer.getComputerChoice).toHaveBeenCalledTimes(1);
    });

    it('should update score when player wins', () => {
      // Setup for player to win
      vi.mocked(evilComputer.getComputerChoice).mockReturnValue('scissors');

      playTurn('rock'); // rock beats scissors

      expect(mockGameState.currentScore).toBe(11); // 10 + 1
      expect(setGameState).toHaveBeenCalledWith(mockGameState);
    });

    it('should not update score when player loses', () => {
      // Setup for player to lose
      vi.mocked(evilComputer.getComputerChoice).mockReturnValue('paper');

      playTurn('rock'); // rock loses to paper

      expect(mockGameState.currentScore).toBe(10); // unchanged
      expect(setGameState).toHaveBeenCalledWith(mockGameState);
    });

    it('should not update score when there is a tie', () => {
      // Setup for a tie
      vi.mocked(evilComputer.getComputerChoice).mockReturnValue('rock');

      playTurn('rock'); // rock ties with rock

      expect(mockGameState.currentScore).toBe(10); // unchanged
      expect(setGameState).toHaveBeenCalledWith(mockGameState);
    });

    it('should update turn history with player choice', () => {
      playTurn('spock');
      playTurn('lizard');

      expect(mockGameState.playerTurnHistory).toEqual([
        'rock',
        'paper',
        'spock',
        'lizard',
      ]);
      expect(setGameState).toHaveBeenCalledWith(mockGameState);
    });

    it('should return the turn result', () => {
      const result = playTurn('rock');

      expect(result.playerChoice).toBe('rock');
      expect(result.computerChoice).toBe('scissors');
      expect(result.outcome).toBe('win');
      expect(result.reason).toContain('Rock crushes Scissors');
    });
  });
});
