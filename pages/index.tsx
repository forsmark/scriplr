import type { NextPage } from "next";
import Card from "../components/Card";
import PinInput from "../components/PinInput";
import Guesses from "../components/Guesses";
import { Guess, LetterStatus } from "../lib/types/guess";
import { useCallback, useMemo, useRef, useState } from "react";
import GuessButton from "../components/GuessButton";
import {
  checkAllowedGuess,
  getGuess,
  getKeyboardLetters,
  getWord,
} from "../lib/play";
import Keyboard from "../components/Keyboard";
import Contacts from "../components/Contacts";
import Options from "../components/Options";

const Play: NextPage = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [showNotAllwed, setShowNotAllwed] = useState(false);
  const [enforceMaxGuesses, setEnforceMaxGuesses] = useState(false);
  const [maxGuesses, setMaxGuesses] = useState(6);
  const word = useRef(getWord());
  const done = useMemo(() => {
    return (
      guesses[guesses.length - 1]?.status.every(
        (s) => s === LetterStatus.CORRECT
      ) ||
      (enforceMaxGuesses && guesses.length === maxGuesses)
    );
  }, [guesses, enforceMaxGuesses, maxGuesses]);
  const canGuess = useMemo(
    () => !!currentGuess && currentGuess.length === 5,
    [currentGuess]
  );
  const keyboardLetters = useMemo(() => getKeyboardLetters(guesses), [guesses]);

  const handleGuess = useCallback(() => {
    if (done) {
      setCurrentGuess("");
      setGuesses([]);
      word.current = getWord();
      return;
    }

    if (checkAllowedGuess(currentGuess)) {
      if (canGuess) {
        const guess = getGuess(currentGuess, word.current);
        setCurrentGuess("");
        setGuesses([...guesses, guess]);
      }
    } else {
      setShowNotAllwed(true);
      setTimeout(() => {
        setShowNotAllwed(false);
      }, 3000);
    }
  }, [canGuess, currentGuess, done, guesses]);

  const handleAppendLetter = useCallback(
    (letter: string) => {
      console.log({ letter, currentGuess });

      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + letter);
      }
    },
    [currentGuess]
  );

  return (
    <div
      className="w-screen h-screen bg-green-300"
      style={{
        backgroundImage: `url(/assets/bg.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full h-full overflow-y-scroll flex flex-col items-center p-4 gap-4">
        <Card>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-8xl	font-semibold	font-mono tracking-wide text-purple-400">
              scriplr
            </h1>

            <p className="font-light font-mono">
              a wordle clone made by{" "}
              <a
                className="text-semibold text-purple-400"
                href="https://forsmark.dev"
                rel="noreferrer"
                target="_blank"
              >
                forsmark.dev
              </a>
            </p>

            <Contacts />
          </div>
        </Card>

        <div className="flex gap-4">
          <div>
            <Card className="flex flex-col gap-4">
              <Guesses guesses={guesses} />

              {!done && (
                <PinInput
                  setValue={setCurrentGuess}
                  value={currentGuess}
                  onEnter={handleGuess}
                />
              )}

              <GuessButton
                disabled={!canGuess && !done}
                onClick={handleGuess}
                done={done}
              />
            </Card>

            {showNotAllwed && (
              <div className="w-full bg-red-300 border-2 border-red-400 rounded-xl p-2 mt-4 text-lg text-center">
                Not in word list
              </div>
            )}
          </div>

          <Card className="flex flex-col gap-4 h-64">
            <Keyboard
              letters={keyboardLetters}
              appendLetter={handleAppendLetter}
            />

            <Options
              enforceMaxGuesses={enforceMaxGuesses}
              setEnforceMaxGuesses={setEnforceMaxGuesses}
              maxGuesses={maxGuesses}
              setMaxGuesses={setMaxGuesses}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Play;
