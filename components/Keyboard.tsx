import clsx from "clsx";
import React from "react";
import { LetterStatus } from "../lib/types/guess";

interface Props {
  letters: Record<string, LetterStatus>;
  appendLetter?: (value: string) => void;
}

interface LetterProps {
  char: string;
  status?: LetterStatus;
  appendLetter?: (value: string) => void;
}

const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

const Letter: React.FC<LetterProps> = ({ char, status, appendLetter }) => (
  <div
    className={clsx(
      "p-1 border rounded-lg select-none text-2xl w-7 md:w-8 flex items-center justify-center cursor-pointer",
      {
        ["bg-gray-500"]: status === LetterStatus.WRONG,
        ["border-gray-600"]: status === LetterStatus.WRONG,
        ["bg-yellow-300"]: status === LetterStatus.MISPLACED,
        ["border-yellow-400"]: status === LetterStatus.MISPLACED,
        ["bg-green-300"]: status === LetterStatus.CORRECT,
        ["border-green-400"]: status === LetterStatus.CORRECT,
        ["bg-gray-300"]: !status,
        ["border-gray-400"]: !status,
      }
    )}
    onClick={() => {
      appendLetter?.(char);
    }}
  >
    {char}
  </div>
);

const Keyboard: React.FC<Props> = ({ letters, appendLetter }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {topRow.map((letter) => (
          <Letter
            key={letter}
            char={letter}
            status={letters[letter]}
            appendLetter={appendLetter}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {middleRow.map((letter) => (
          <Letter
            key={letter}
            char={letter}
            status={letters[letter]}
            appendLetter={appendLetter}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {bottomRow.map((letter) => (
          <Letter
            key={letter}
            char={letter}
            status={letters[letter]}
            appendLetter={appendLetter}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Keyboard);
