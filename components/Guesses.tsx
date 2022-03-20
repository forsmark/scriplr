import clsx from "clsx";
import React from "react";
import { Guess, LetterStatus } from "../lib/types/guess";

interface Props {
  guesses: Guess[];
}

const getLetterColor = (
  status: LetterStatus
): { bg: string; border: string } => {
  switch (status) {
    case LetterStatus.MISPLACED:
      return { bg: "bg-yellow-200", border: "border-yellow-400" };
    case LetterStatus.CORRECT:
      return { bg: "bg-green-300", border: "border-green-400" };
    case LetterStatus.WRONG:
    default:
      return { bg: "bg-gray-300", border: "border-gray-400" };
  }
};

const Guesses: React.FC<Props> = ({ guesses }) => {
  return (
    <div className="flex flex-col gap-4">
      {guesses.map((guess, guessIndex) => {
        return (
          <div key={guessIndex} className="flex gap-4">
            {guess.letters.map((letter, letterIndex) => {
              const color = getLetterColor(guess.status[letterIndex]);

              return (
                <div
                  key={`${guessIndex}-${letterIndex}`}
                  className={clsx(
                    "h-20 w-16 rounded-lg flex items-center justify-center text-4xl border-2 select-none text-gray-600",
                    color.bg,
                    color.border
                  )}
                >
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Guesses);
