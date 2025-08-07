// import { useEffect } from "react";
import { useGameActions, useGameStore } from "../stores/gameStore";
import { cn } from "../utils/cn";
import { motion, stagger } from "motion/react";

const AnswerOptions = () => {
  const currentCountry = useGameStore((state) => state.currentCountry);
  const gameStatus = useGameStore((state) => state.status);
  const correctGuess = useGameStore((state) => state.correctGuess);
  const userGuess = useGameStore((state) => state.userGuess);
  const { setUserGuess } = useGameActions();

  // the container and item variables are used for staggering animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.05),
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.01,
      },
    },
  };

  return (
    <motion.div className="flex flex-col gap-2">
      {currentCountry?.answerOptions.map((option) => (
        <motion.div
          key={option}
          onClick={() => {
            if (gameStatus === "playing") {
              setUserGuess(option);
            }
          }}
          // refactor this, maybe put into component with variants
          className={cn(
            "p-2 border-[1px] border-gray-100 hover:bg-gray-200 bg-white cursor-pointer rounded-md duration-100 shadow-sm select-none",
            gameStatus === "lost" &&
              "opacity-30 bg-gray-300 cursor-default hover:bg-disabled",
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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={option}
          >
            <motion.p variants={item} key={option}>
              {option}
            </motion.p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnswerOptions;
