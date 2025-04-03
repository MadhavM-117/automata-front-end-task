/* Game logic for Rock, Paper, Scissors, Lizard, Spock */

import { TurnOption, TurnResult } from '../models'
import { getGameState, setGameState } from './storage'
import { getComputerChoice } from './evilComputer'

// Defines the rules of the game - which option beats which
const gameRules: Record<TurnOption, TurnOption[]> = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['scissors', 'rock'],
}

// Get the outcome reason based on choices
const getOutcomeReason = (winner: TurnOption, loser: TurnOption): string => {
  if (winner === 'scissors' && loser === 'paper') return 'Scissors cuts Paper'
  if (winner === 'scissors' && loser === 'lizard')
    return 'Scissors decapitates Lizard'
  if (winner === 'paper' && loser === 'rock') return 'Paper covers Rock'
  if (winner === 'paper' && loser === 'spock') return 'Paper disproves Spock'
  if (winner === 'rock' && loser === 'scissors') return 'Rock crushes Scissors'
  if (winner === 'rock' && loser === 'lizard') return 'Rock crushes Lizard'
  if (winner === 'lizard' && loser === 'paper') return 'Lizard eats Paper'
  if (winner === 'lizard' && loser === 'spock') return 'Lizard poisons Spock'
  if (winner === 'spock' && loser === 'scissors')
    return 'Spock smashes Scissors'
  if (winner === 'spock' && loser === 'rock') return 'Spock vaporizes Rock'
  return 'Wait. Something has gone terribly wrong.'
}

// Determine the outcome of a turn
export const determineTurnOutcome = (
  playerChoice: TurnOption,
  computerChoice: TurnOption,
): TurnResult => {
  // If both choices are the same, it's a tie
  if (playerChoice === computerChoice) {
    return {
      playerChoice,
      computerChoice,
      outcome: 'tie',
      reason: 'Tie - we are both the same. How boring..',
    }
  }

  // Check if player wins
  if (gameRules[playerChoice].includes(computerChoice)) {
    return {
      playerChoice,
      computerChoice,
      outcome: 'win',
      reason:
        "You win. I'll allow it This time.. " +
        getOutcomeReason(playerChoice, computerChoice),
    }
  }

  // Computer wins
  return {
    playerChoice,
    computerChoice,
    outcome: 'lose',
    reason:
      'Ha! Victory is mine! ' + getOutcomeReason(computerChoice, playerChoice),
  }
}

// Play a turn and update the game state
export const playTurn = (playerChoice: TurnOption): TurnResult => {
  const computerChoice = getComputerChoice()
  const result = determineTurnOutcome(playerChoice, computerChoice)

  // Get the current game state
  const gameState = getGameState()

  // Update the score based on the outcome
  if (result.outcome === 'win') {
    gameState.currentScore += 1
  }

  // Add the player's choice to the turn history
  gameState.playerTurnHistory.push(playerChoice)

  // Save the updated game state
  setGameState(gameState)

  return result
}
