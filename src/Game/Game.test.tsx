import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';
import Game from './Game';
import * as gameLib from '../lib/game';
import * as storageLib from '../lib/storage';
import { TurnResult } from '../models';

vi.mock(import('../lib/storage'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getGameState: vi.fn(),
    setScore: vi.fn(),
    setTurnHistory: vi.fn(),
    setUsername: vi.fn(),
  };
});

describe('Game Component', () => {
  beforeEach(() => {
    vi.mocked(storageLib.getGameState).mockReturnValue({
      username: null,
      currentScore: 0,
      playerTurnHistory: [],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the UsernameInput component by default', () => {
    render(<Game />);

    // Check if the username form is displayed
    expect(screen.getByTestId('username-form')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('username-submit')).toBeInTheDocument();
  });

  it('should switch to PlayGame component after entering a valid username', async () => {
    const user = userEvent.setup();

    render(<Game />);

    // Verify UsernameInput is initially displayed
    expect(screen.getByTestId('username-form')).toBeInTheDocument();

    // Enter a username and submit the form
    const usernameInput = screen.getByTestId('username-input');
    await user.type(usernameInput, 'TestPlayer');

    const submitButton = screen.getByTestId('username-submit');
    await user.click(submitButton);

    // username state should be updated
    expect(storageLib.setUsername).toHaveBeenCalledWith('TestPlayer');

    // After submission, UsernameInput should no longer be visible
    expect(screen.queryByTestId('username-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('play-game')).toBeInTheDocument();
  });

  it('should not switch components if username is empty', async () => {
    const user = userEvent.setup();
    render(<Game />);

    // Submit an empty username
    const submitButton = screen.getByTestId('username-submit');
    await user.click(submitButton);

    // no change to username state
    expect(storageLib.setUsername).not.toHaveBeenCalled();

    // Username form should still be visible
    expect(screen.getByTestId('username-form')).toBeInTheDocument();
  });

  describe('Play the game', () => {
    beforeEach(() => {
      vi.mocked(storageLib.getGameState).mockReturnValue({
        username: 'Player1',
        currentScore: 0,
        playerTurnHistory: [],
      });

      render(<Game />);
    });

    it('should render play buttons initially', () => {
      expect(screen.getByTestId('play-turn')).toBeInTheDocument();
      expect(screen.getByText('Rock')).toBeInTheDocument();
      expect(screen.getByText('Paper')).toBeInTheDocument();
      expect(screen.getByText('Scissors')).toBeInTheDocument();
      expect(screen.getByText('Lizard')).toBeInTheDocument();
      expect(screen.getByText('Spock')).toBeInTheDocument();
    });

    it('should show turn result after clicking a play button', async () => {
      const user = userEvent.setup();

      // Mock the playTurn function to return a win result
      const mockTurnResult: TurnResult = {
        playerChoice: 'rock',
        computerChoice: 'scissors',
        outcome: 'win',
        reason: "You win. I'll allow it This time.. Rock crushes Scissors",
      };
      vi.spyOn(gameLib, 'playTurn').mockReturnValue(mockTurnResult);

      // Click the Rock button
      await user.click(screen.getByText('Rock'));

      // Verify turn result is shown
      expect(screen.getByTestId('turn-result')).toBeInTheDocument();
      expect(screen.getByText(mockTurnResult.reason)).toBeInTheDocument();
      expect(screen.getByText('Again!')).toBeInTheDocument();
    });

    it('should go back to play buttons when clicking Again', async () => {
      const user = userEvent.setup();

      // Mock the playTurn function
      const mockTurnResult: TurnResult = {
        playerChoice: 'paper',
        computerChoice: 'rock',
        outcome: 'win',
        reason: "You win. I'll allow it This time.. Paper covers Rock",
      };
      vi.spyOn(gameLib, 'playTurn').mockReturnValue(mockTurnResult);

      // Play a turn
      await user.click(screen.getByText('Paper'));

      // Verify result is shown
      expect(screen.getByTestId('turn-result')).toBeInTheDocument();

      // Click Again button
      await user.click(screen.getByText('Again!'));

      // Verify we're back to the play turn screen
      expect(screen.queryByTestId('turn-result')).not.toBeInTheDocument();
      expect(screen.getByTestId('play-turn')).toBeInTheDocument();
    });

    it('should update game state with play result', async () => {
      const user = userEvent.setup();

      // Mock different outcomes to test state updates
      const winResult: TurnResult = {
        playerChoice: 'spock',
        computerChoice: 'scissors',
        outcome: 'win',
        reason: "You win. I'll allow it This time.. Spock smashes Scissors",
      };

      vi.spyOn(gameLib, 'playTurn').mockReturnValue(winResult);

      // Play a turn
      await user.click(screen.getByText('Spock'));

      // Check localStorage was updated correctly
      expect(storageLib.setScore).toHaveBeenCalledWith(1);
      expect(storageLib.setTurnHistory).toHaveBeenCalledWith(['spock']);
    });
  });
});
