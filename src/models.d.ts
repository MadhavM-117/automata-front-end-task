export type TurnOption = 'scissors' | 'paper' | 'rock' | 'lizard' | 'spock';

export interface InternalGameState {
  username: string | null;
  currentScore: number;
  playerTurnHistory: TurnOption[];
}

export type GameOutcome = 'win' | 'lose' | 'tie';

export interface TurnResult {
  playerChoice: TurnOption;
  computerChoice: TurnOption;
  outcome: GameOutcome;
  reason: string;
}
