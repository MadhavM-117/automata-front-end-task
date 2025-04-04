import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';
import Game from './Game';

describe('Game Component', () => {
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

    // After submission, UsernameInput should no longer be visible
    expect(screen.queryByTestId('username-form')).not.toBeInTheDocument();
  });

  it('should not switch components if username is empty', async () => {
    const user = userEvent.setup();
    render(<Game />);

    // Submit an empty username
    const submitButton = screen.getByTestId('username-submit');
    await user.click(submitButton);

    // Username form should still be visible
    expect(screen.getByTestId('username-form')).toBeInTheDocument();
  });
});

