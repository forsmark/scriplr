import React from "react";

interface Props {
  enforceMaxGuesses: boolean;
  setEnforceMaxGuesses: (value: boolean) => void;
  maxGuesses: number;
  setMaxGuesses: (value: number) => void;
}

const Options: React.FC<Props> = ({
  enforceMaxGuesses,
  setEnforceMaxGuesses,
  maxGuesses,
  setMaxGuesses,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Maximum number of guesses:</p>
        <div className="flex gap-4 mt-2 items-center">
          <input
            className="w-4 h-4 checked:bg-purple-400"
            type="checkbox"
            checked={enforceMaxGuesses}
            onChange={(evt) => setEnforceMaxGuesses(evt.target.checked)}
          />

          <input
            className="w-12 text-lg p-1 rounded-lg border-2 border-gray-300 disabled:bg-gray-300"
            type="number"
            value={maxGuesses}
            disabled={!enforceMaxGuesses}
            onChange={(evt) => setMaxGuesses(+evt.target.value)}
            min={1}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Options);
