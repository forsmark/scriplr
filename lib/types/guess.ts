export enum LetterStatus {
  WRONG = "wrong",
  MISPLACED = "misplaced",
  CORRECT = "correct",
  UNKNOWN = "unknown",
}

export interface Guess {
  letters: string[];
  status: LetterStatus[];
}
