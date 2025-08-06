import { AnimatePresence, motion } from "motion/react";
import { useGameActions, useGameStore } from "../stores/gameStore";
import { ConfettiSideCannons } from "./ConfettiSideCannons";
import getRandomMeme from "../utils/getRandomMeme";
import { Button } from "./Button";

const WinningModal = () => {
  const gameStatus = useGameStore((state) => state.status);
  const { reset, setStatus } = useGameActions();
  return (
    <AnimatePresence>
      {gameStatus === "won" && (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute z-50 top-0 left-0 w-full h-full bg-black/50"></div>
            <ConfettiSideCannons />
            <div className="absolute z-50 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2  w-96 bg-white rounded-md p-4 shadow-lg flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-4">You won!</h1>
              <div className="mb-4">
                <p className="text-center text-xl">GOD DAMN YOU ARE SICK!</p>
                <p>YOU MUST HAVE A HUMONGOUS BRAIN</p>
              </div>
              <motion.img
                src={getRandomMeme("win")}
                alt="Winning gif"
                className="rounded-md w-full aspect-video object-cover"
              />
              <Button
                className="mt-8"
                fullWidth
                onClick={() => {
                  reset();
                  setStatus("playing");
                }}
              >
                Play again
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WinningModal;
