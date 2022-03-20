import { Guess, LetterStatus } from "./types/guess";

export const getGuess = (guess: string, word: string): Guess => {
  const splitWord = word.split("").map((c) => c.toUpperCase());
  const letterFrequency = splitWord.reduce(
    (total, char) => ({
      ...total,
      [char]: total[char] ? total[char] + 1 : 1,
    }),
    {} as Record<string, number>
  );

  return guess.split("").reduce(
    (guess, letter, index) => {
      let status = LetterStatus.WRONG;

      if (splitWord.includes(letter)) {
        if (splitWord[index] === letter) {
          status = LetterStatus.CORRECT;
          letterFrequency[letter] = letterFrequency[letter] - 1;
        } else if (letterFrequency[letter] > 0) {
          letterFrequency[letter] = letterFrequency[letter] - 1;
          status = LetterStatus.MISPLACED;
        } else {
          status = LetterStatus.WRONG;
        }
      }

      return {
        letters: [...guess.letters, letter],
        status: [...guess.status, status],
      };
    },
    { letters: [], status: [] } as Guess
  );
};

export const checkAllowedGuess = (guess: string) => {
  const allowedGuesses = require("../assets/allowed.json") as string[];
  const words = require("../assets/words.json") as string[];

  return (
    words.includes(guess.toLowerCase()) ||
    allowedGuesses.includes(guess.toLowerCase())
  );
};

export const getWord = () => {
  const words = require("../assets/words.json") as string[];
  const randomIndex = Math.floor(Math.random() * (words.length + 1));
  return words[randomIndex].toUpperCase();
};

export const getKeyboardLetters = (
  guesses: Guess[]
): Record<string, LetterStatus> => {
  return guesses.reduce((keyboardLetters, guess) => {
    guess.letters.forEach((letter, index) => {
      const status = guess.status[index];

      if (
        !keyboardLetters[letter] ||
        keyboardLetters[letter] === LetterStatus.WRONG
      ) {
        keyboardLetters[letter] = status;
      } else if (
        keyboardLetters[letter] === LetterStatus.MISPLACED &&
        status === LetterStatus.WRONG
      ) {
        keyboardLetters[letter] = status;
      }
    });

    return keyboardLetters;
  }, {} as Record<string, LetterStatus>);
};
