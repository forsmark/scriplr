import clsx from "clsx";
import React from "react";
import { BsArrowRepeat } from "react-icons/bs";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  done?: boolean;
}

const GuessButton: React.FC<Props> = ({ onClick, disabled, done }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-full h-16 text-4xl text-gray-600 font-medium rounded-xl border-2 cursor-pointer disabled:hover:scale-100 hover:scale-105 transition duration-200",
        {
          ["bg-gray-300"]: disabled,
          ["border-gray-400"]: disabled,
          ["bg-green-300"]: !disabled || done,
          ["border-green-400"]: !disabled || done,
        }
      )}
    >
      {done ? (
        <div className="flex gap-2 justify-center items-center w-full">
          <BsArrowRepeat /> <span>Play again</span>
        </div>
      ) : (
        "Guess"
      )}
    </button>
  );
};

export default React.memo(GuessButton);
