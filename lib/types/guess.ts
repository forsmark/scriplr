export enum LetterStatus {
  WRONG = "wrong",
  MISPLACED = "misplaced",
  CORRECT = "correct",
}

export interface Guess {
  letters: string[];
  status: LetterStatus[];
}
