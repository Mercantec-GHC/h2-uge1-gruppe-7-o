import { motion } from "motion/react";
import { useGameActions, useGameStore } from "../stores/gameStore";
import { Button } from "./Button";

const GameButton = () => {
  const { reset, setStatus } = useGameActions();
  const gameStatus = useGameStore((state) => state.status);
  return (
    <div className="">
      {gameStatus === "lost" && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Button
            className="mt-8"
            fullWidth
            onClick={() => {
              reset();
              setStatus("playing");
            }}
          >
            Go again
          </Button>
        </motion.div>
      )}
      {gameStatus == "playing" && (
        <Button className="mt-8" fullWidth onClick={() => reset()}>
          Reset
        </Button>
      )}
    </div>
  );
};

export default GameButton;
