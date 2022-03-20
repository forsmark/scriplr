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

  const firstPass = guess.split("").reduce(
    (guess, letter, index) => {
      let status = LetterStatus.WRONG;

      if (splitWord[index] === letter) {
        status = LetterStatus.CORRECT;
        letterFrequency[letter] = letterFrequency[letter] - 1;
      } else {
        status = LetterStatus.UNKNOWN;
      }

      return {
        letters: [...guess.letters, letter],
        status: [...guess.status, status],
      };
    },
    { letters: [], status: [] } as Guess
  );

  const secondPass = firstPass.letters.reduce(
    (guess, letter, index) => {
      let status = LetterStatus.WRONG;

      if (firstPass.status[index] === LetterStatus.UNKNOWN) {
        if (splitWord.includes(letter) && letterFrequency[letter] > 0) {
          status = LetterStatus.MISPLACED;
          letterFrequency[letter] = letterFrequency[letter] - 1;
        } else {
          status = LetterStatus.WRONG;
        }
      } else {
        status = firstPass.status[index];
      }

      return {
        letters: [...guess.letters, letter],
        status: [...guess.status, status],
      };
    },
    { letters: [], status: [] } as Guess
  );

  console.log({ ...secondPass });

  return secondPass;
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
        status === LetterStatus.CORRECT
      ) {
        keyboardLetters[letter] = status;
      }
    });

    return keyboardLetters;
  }, {} as Record<string, LetterStatus>);
};
