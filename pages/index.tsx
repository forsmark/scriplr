import type { NextPage } from "next";
import Card from "../components/Card";
import PinInput from "../components/PinInput";
import Guesses from "../components/Guesses";
import { Guess, LetterStatus } from "../lib/types/guess";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { Transition } from "@headlessui/react";
import Head from "next/head";

const Play: NextPage = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [showNotAllwed, setShowNotAllwed] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const [showWord, setShowWord] = useState(false);
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
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + letter);
      }
    },
    [currentGuess]
  );

  const handleRemoveLastLetter = useCallback(() => {
    setCurrentGuess(
      currentGuess
        .split("")
        .slice(0, currentGuess.length - 1)
        .join("")
    );
  }, [currentGuess]);

  useEffect(() => {
    if (
      done &&
      guesses[guesses.length - 1]?.status.every(
        (s) => s === LetterStatus.CORRECT
      )
    ) {
      setShowSucess(true);
      setTimeout(() => {
        setShowSucess(false);
      }, 3000);
    } else if (done) {
      setShowWord(true);
      setTimeout(() => {
        setShowWord(false);
      }, 3000);
    }
  }, [done, guesses]);

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
      <Head>
        <title>scriplr</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Wordle clone" />
        <meta name="keywords" content="Wordle, Clone, Frontend" />
        <meta name="author" content="Marc Forsmark Nielsen" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="w-full h-full overflow-y-scroll flex flex-col items-center p-4 gap-4">
        <Card>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl md:text-8xl	font-semibold	font-mono tracking-wide text-purple-400">
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

        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Card className="flex flex-col gap-4 max-w-sm md:max-w-none mx-auto">
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

            <Transition
              show={showWord}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="w-full bg-yellow-300 border-2 border-yellow-400 rounded-xl p-2 mt-4 text-xl text-center transition duration-200"
            >
              The word was:{" "}
              <span className="font-semibold tracking-wide font-mono">
                {word.current}
              </span>
            </Transition>

            <Transition
              show={showNotAllwed}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="w-full bg-red-300 border-2 border-red-400 rounded-xl p-2 mt-4 text-xl text-center transition duration-200"
            >
              Not in word list
            </Transition>

            <Transition
              show={showSucess}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="w-full bg-green-300 border-2 border-green-400 rounded-xl p-2 mt-4 text-xl font-semibold text-center transition duration-200"
            >
              Congratulations!
            </Transition>
          </div>

          <Card className="flex flex-col gap-4 h-64 max-w-sm md:max-w-none">
            <Keyboard
              letters={keyboardLetters}
              appendLetter={handleAppendLetter}
              removeLastLetter={handleRemoveLastLetter}
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
