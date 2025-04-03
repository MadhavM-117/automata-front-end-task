/* Internal for the evil computer you're playing against. Look away, now! */

import { TurnOption } from '../models'

// Generate a random choice for the computer
export const getComputerChoice = (): TurnOption => {
  const options: TurnOption[] = ['rock', 'paper', 'scissors', 'lizard', 'spock']
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}
