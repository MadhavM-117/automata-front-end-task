export type TurnOption = "scissors" | "paper" | "rock" | "lizard" | "spock";

export interface InternalGameState {
  username: string | null;
  currentScore: number;
  playerTurnHistory: TurnOption[];
}
