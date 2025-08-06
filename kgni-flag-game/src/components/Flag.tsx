import { motion } from "motion/react";
import { useGameStore } from "../stores/gameStore";

const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.3, ease: "easeInOut" },
};

const Flag = () => {
  const currentCountry = useGameStore((state) => state.currentCountry);
  const gameStatus = useGameStore((state) => state.status);

  // creating keys like this is probably not the best way (hacky solution that works for now)
  const shakeKey = gameStatus === "lost" ? Date.now() : "no-shake";
  const overlayKey = gameStatus === "lost" ? Date.now() + 1 : "no-overlay";

  return (
    <motion.div
      key={currentCountry?.flags.png}
      initial={{
        opacity: 0,
        scale: 0.9,
        rotateX: 180,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        filter: "none",
        transition: {
          duration: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 25,
        },
      }}
      className="h-[200px] relative aspect-video mb-8 rounded-md shadow-xl"
    >
      {gameStatus === "lost" && (
        <motion.div
          key={overlayKey}
          animate={shakeAnimation}
          className="absolute z-50 top-0 left-0 w-full h-full rounded-md bg-red-500/30 duratoin-500"
        ></motion.div>
      )}

      {gameStatus !== "won" && (
        <motion.img
          key={shakeKey} // re-mounts on wrong guess to retrigger shake
          className="w-full h-full rounded-md"
          src={currentCountry?.flags.png}
          alt="Flag"
          animate={gameStatus === "lost" ? shakeAnimation : {}}
        />
      )}
    </motion.div>
  );
};

export default Flag;
