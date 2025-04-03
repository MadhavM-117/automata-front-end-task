/* Manage storage of browser state in local storage */

import { InternalGameState, TurnOption } from '../models'

export const isValidTurnHistory = (arr: unknown[]): arr is TurnOption[] => {
  return arr.every((turn) => {
    return turn === 'string' && isValidTurn(turn)
  })
}

export const isValidTurn = (value: string): value is TurnOption => {
  return ['scissors', 'paper', 'rock', 'lizard', 'spock'].includes(
    value as TurnOption,
  )
}

export const extractValidScore = (score: string | null): number => {
  let currentScore = 0

  try {
    if (score !== null) {
      currentScore = parseInt(score, 10)
    }
  } catch (error) {
    console.error('Error while extracting score.', error)
    currentScore = 0
  }

  return currentScore
}

export const extractValidTurnHistory = (
  savedHistory: string | null,
): TurnOption[] => {
  let turnHistory: TurnOption[] = []

  try {
    if (savedHistory !== null) {
      const extractedTurns: unknown = JSON.parse(savedHistory)
      if (Array.isArray(extractedTurns) && isValidTurnHistory(extractedTurns)) {
        turnHistory = extractedTurns
      }
    }
  } catch (error) {
    console.error('Error while extracting turn history.', error)
    turnHistory = []
  }

  return turnHistory
}

export const getGameState = (): InternalGameState => {
  return {
    username: localStorage.getItem('automata-username'),
    currentScore: extractValidScore(localStorage.getItem('automata-score')),
    playerTurnHistory: extractValidTurnHistory(
      localStorage.getItem('automata-turn-history'),
    ),
  }
}

export const setGameState = ({
  username,
  currentScore,
  playerTurnHistory,
}: InternalGameState): void => {
  if (username !== null) {
    localStorage.setItem('automata-username', username)
  }

  localStorage.setItem('automata-score', currentScore.toString())
  localStorage.setItem(
    'automata-turn-history',
    JSON.stringify(playerTurnHistory),
  )
}
