import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';
import Scoreboard from './Scoreboard';
import { GameStateContext } from '../hooks';
import { InternalGameState } from '../models';

describe('Scoreboard Component', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: () => {
        store = {};
      },
    };
  })();

  // Replace global localStorage with mock
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render anything when username is null', () => {
    render(<Scoreboard />);

    // Scoreboard should not be in the document
    expect(screen.queryByTestId('scoreboard')).not.toBeInTheDocument();
  });

  it('should display the username and current score', () => {
    // Create mock state with username and score
    const mockState: InternalGameState = {
      username: 'TestUser',
      currentScore: 42,
      playerTurnHistory: [],
    };

    const mockDispatch = vi.fn();

    // Render with mock context
    render(
      <GameStateContext.Provider
        value={{ gameState: mockState, dispatch: mockDispatch }}
      >
        <Scoreboard />
      </GameStateContext.Provider>,
    );

    // Check if username and score are displayed
    expect(screen.getByTestId('scoreboard')).toBeInTheDocument();
    expect(screen.getByText(/TestUser/)).toBeInTheDocument();
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });

  it('should reset the game when reset button is clicked', async () => {
    const user = userEvent.setup();

    // Create mock state
    const mockState: InternalGameState = {
      username: 'TestUser',
      currentScore: 10,
      playerTurnHistory: ['rock', 'paper'],
    };

    // Create mock dispatch function
    const mockDispatch = vi.fn();

    // Render with mock context
    render(
      <GameStateContext.Provider
        value={{ gameState: mockState, dispatch: mockDispatch }}
      >
        <Scoreboard />
      </GameStateContext.Provider>,
    );

    // Find and click the reset button
    const resetButton = screen.getByText('Reset Game');
    await user.click(resetButton);

    // Check if dispatch was called with RESET_GAME action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET_GAME' });
  });

  it('should reflect updated score from global state', () => {
    // Initial state
    const initialState: InternalGameState = {
      username: 'TestUser',
      currentScore: 2,
      playerTurnHistory: [],
    };

    const { rerender } = render(
      <GameStateContext.Provider
        value={{ gameState: initialState, dispatch: vi.fn() }}
      >
        <Scoreboard />
      </GameStateContext.Provider>,
    );

    // Check initial score
    expect(screen.getByText(/2/)).toBeInTheDocument();

    // Updated state
    const updatedState: InternalGameState = {
      username: 'TestUser',
      currentScore: 15,
      playerTurnHistory: [],
    };

    // Re-render with updated state
    rerender(
      <GameStateContext.Provider
        value={{ gameState: updatedState, dispatch: vi.fn() }}
      >
        <Scoreboard />
      </GameStateContext.Provider>,
    );

    // Check if score was updated
    expect(screen.getByText(/15/)).toBeInTheDocument();
  });
});
