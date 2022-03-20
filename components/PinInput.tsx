import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { checkAllowedGuess } from "../lib/play";

interface Props {
  setValue?: (value: string) => void;
  value?: string;
  colors?: string[];
  onArrow?: (index: number, direction: string) => void;
  onEnter?: () => void;
}

const PinInput: React.FC<Props> = ({
  setValue,
  value = "",
  colors = [],
  onArrow,
  onEnter,
}) => {
  const [chars, setChars] = useState<string[]>(new Array(5).fill(""));
  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      //@ts-ignore
      const form = evt.target.form;
      const index = [...(form ?? [])].indexOf(evt.target);
      const value = evt.key.toUpperCase();

      switch (evt.key) {
        case "Backspace":
          setChars(chars.map((c, i) => (i === index ? "" : c)));
          form.elements[index - 1]?.focus();
          break;
        case "ArrowRight":
          form.elements[index + 1]?.focus();
          onArrow?.(index, "right");
          break;
        case "ArrowLeft":
          form.elements[index - 1]?.focus();
          onArrow?.(index, "left");
          break;
        case "ArrowUp":
          onArrow?.(index, "up");
          break;
        case "ArrowDown":
          onArrow?.(index, "down");
          break;
        case "Enter":
          if (chars.every((c) => !!c)) {
            onEnter?.();
            if (checkAllowedGuess(chars.join(""))) {
              setChars(new Array(5).fill(""));
              form.elements[0]?.focus();
            }
          }
          break;
        default:
          if (letters.includes(value)) {
            setChars(chars.map((c, i) => (i === index ? value : c)));
            form.elements[index + 1]?.focus();
          }
          break;
      }
    },
    [chars, onArrow, onEnter]
  );

  useEffect(() => {
    setValue?.(chars.join(""));
  }, [chars, setValue]);

  useEffect(() => {
    if (value) {
      setChars(new Array(5).fill("").map((_, i) => value.split("")[i] ?? ""));
    } else {
      setChars(new Array(5).fill(""));
    }
  }, [value]);

  return (
    <form className={clsx("flex gap-4")}>
      {chars.map((char: string, index: number) => {
        return (
          <input
            key={index}
            className={clsx(
              "h-20 w-16 rounded-lg text-center text-4xl outline-offset-2 outline-gray-400 text-gray-600",
              {
                [`bg-${colors[index]}-300`]: !!colors[index],
              }
            )}
            maxLength={1}
            value={char}
            onKeyDown={handleKeyDown}
            onChange={() => {}}
          />
        );
      })}
    </form>
  );
};

export default React.memo(PinInput);

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
