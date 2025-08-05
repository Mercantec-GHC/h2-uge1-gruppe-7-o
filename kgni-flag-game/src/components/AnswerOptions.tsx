// import { useEffect } from "react";
import { useGameActions, useGameStore } from "../stores/gameStore";
import { cn } from "../utils/cn";

const AnswerOptions = () => {
  const currentCountry = useGameStore((state) => state.currentCountry);
  const gameStatus = useGameStore((state) => state.status);
  const correctGuess = useGameStore((state) => state.correctGuess);
  const userGuess = useGameStore((state) => state.userGuess);
  const { setUserGuess } = useGameActions();

  return (
    <div className="flex flex-col gap-2">
      {currentCountry?.answerOptions.map((option) => (
        <div
          key={option}
          onClick={() => {
            gameStatus === "playing" && setUserGuess(option);
          }}
          className={cn(
            "p-2 border-[1px] border-gray-300 hover:bg-gray-200 cursor-pointer rounded-md duration-100 shadow-sm select-none",
            gameStatus === "lost" &&
              "opacity-30 bg-gray-100 cursor-default hover:bg-disabled",
            gameStatus === "lost" &&
              currentCountry?.name.common === option &&
              "bg-green-400 hover:bg-green-400 opacity-50 font-bold",
            gameStatus === "lost" &&
              userGuess === option &&
              "bg-red-400 hover:bg-red-400 opacity-100 font-bold",
            correctGuess &&
              userGuess === option &&
              "bg-green-400 hover:bg-green-400 font-bold",
          )}
        >
          <p>{option}</p>
        </div>
      ))}
    </div>
  );
};

export default AnswerOptions;
