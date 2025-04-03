import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  isValidTurn,
  isValidTurnHistory,
  extractValidScore,
  extractValidTurnHistory,
  getGameState,
  setGameState,
} from './storage'
import { TurnOption } from '../models'

describe('storage', () => {
  describe('isValidTurn', () => {
    it('returns true for valid turn options', () => {
      expect(isValidTurn('scissors')).toBe(true)
      expect(isValidTurn('paper')).toBe(true)
      expect(isValidTurn('rock')).toBe(true)
      expect(isValidTurn('lizard')).toBe(true)
      expect(isValidTurn('spock')).toBe(true)
    })

    it('returns false for invalid turn options', () => {
      expect(isValidTurn('invalid')).toBe(false)
      expect(isValidTurn('')).toBe(false)
    })
  })

  describe('isValidTurnHistory', () => {
    it('should correctly validate an array of valid turn options', () => {
      const validHistory = ['rock', 'paper', 'scissors'] as unknown[]
      expect(isValidTurnHistory(validHistory)).toBe(true)
    })

    it('should reject arrays with invalid turn options', () => {
      const invalidHistory = ['rock', 'invalid', 'scissors'] as unknown[]
      expect(isValidTurnHistory(invalidHistory)).toBe(false)
    })
  })

  describe('extractValidScore', () => {
    it('returns the parsed number for valid score string', () => {
      expect(extractValidScore('10')).toBe(10)
      expect(extractValidScore('0')).toBe(0)
      expect(extractValidScore('-5')).toBe(-5)
    })

    it('returns 0 for null', () => {
      expect(extractValidScore(null)).toBe(0)
    })

    it('returns ints by ignoring everything after the decimal', () => {
      expect(extractValidScore('10.4')).toBe(10)
      expect(extractValidScore('10.8')).toBe(10)
      expect(extractValidScore('0.45')).toBe(0)
      expect(extractValidScore('0.95')).toBe(0)
      expect(extractValidScore('-5.01')).toBe(-5)
      expect(extractValidScore('-5.99')).toBe(-5)
    })

    it('handles errors and returns 0', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {
          /* empty */
        })

      // Non-numeric string should return 0
      // Note: parseInt actually doesn't throw for invalid strings, it returns NaN
      expect(extractValidScore('abc')).toBe(0)

      consoleErrorSpy.mockRestore()
    })

    it('handles errors and returns 0', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {
          /* empty */
        })

      // Non-numeric string should return 0
      // Note: parseInt actually doesn't throw for invalid strings, it returns NaN
      expect(extractValidScore('abc')).toBe(0)

      consoleErrorSpy.mockRestore()
    })
  })

  describe('extractValidTurnHistory', () => {
    it('returns empty array for null input', () => {
      expect(extractValidTurnHistory(null)).toEqual([])
    })

    it('returns empty array for invalid JSON', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {
          /* empty */
        })

      expect(extractValidTurnHistory('invalid json')).toEqual([])

      consoleErrorSpy.mockRestore()
    })

    it('returns empty array for non-array JSON', () => {
      expect(extractValidTurnHistory('{"notAnArray": true}')).toEqual([])
    })
  })

  // Tests for localStorage interactions
  describe('localStorage interactions', () => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: Record<string, string> = {}
      return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          store[key] = value
        }),
        clear: () => {
          store = {}
        },
      }
    })()

    // Replace global localStorage with mock
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      })
      localStorageMock.clear()
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    describe('getGameState', () => {
      it('retrieves game state from localStorage', () => {
        // Setup localStorage with test values
        localStorageMock.setItem('automata-username', 'TestUser')
        localStorageMock.setItem('automata-score', '42')
        localStorageMock.setItem('automata-turn-history', '[]')

        const state = getGameState()

        expect(state).toEqual({
          username: 'TestUser',
          currentScore: 42,
          playerTurnHistory: [],
        })

        expect(localStorageMock.getItem).toHaveBeenCalledWith(
          'automata-username',
        )
        expect(localStorageMock.getItem).toHaveBeenCalledWith('automata-score')
        expect(localStorageMock.getItem).toHaveBeenCalledWith(
          'automata-turn-history',
        )
      })

      it('returns default values when localStorage is empty', () => {
        // All getItem calls will return null
        localStorageMock.getItem.mockReturnValue(null)

        const state = getGameState()

        expect(state).toEqual({
          username: null,
          currentScore: 0,
          playerTurnHistory: [],
        })
      })
    })

    describe('setGameState', () => {
      it('saves game state to localStorage', () => {
        const gameState = {
          username: 'TestUser',
          currentScore: 100,
          playerTurnHistory: ['rock', 'paper', 'scissors'] as TurnOption[],
        }

        setGameState(gameState)

        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'automata-username',
          'TestUser',
        )
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'automata-score',
          '100',
        )
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'automata-turn-history',
          JSON.stringify(['rock', 'paper', 'scissors']),
        )
      })

      it('handles null username', () => {
        const gameState = {
          username: null,
          currentScore: 50,
          playerTurnHistory: [] as TurnOption[],
        }

        setGameState(gameState)

        // Should not call setItem for username when it's null
        expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
          'automata-username',
          null,
        )
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'automata-score',
          '50',
        )
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'automata-turn-history',
          '[]',
        )
      })
    })
  })
})
