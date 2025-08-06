import { AnimatePresence, motion } from "motion/react";
import { useGameStore } from "../stores/gameStore";
import { useEffect, useState } from "react";

const PlusAnimation = () => {
  const score = useGameStore((state) => state.score);
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    let timeoutId: number | undefined;
    setShowAnimation(true);

    timeoutId = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [score]);

  return (
    <div className="flex justify-end relative">
      <AnimatePresence>
        {showAnimation && score > 0 && (
          <motion.div
            key={score}
            className="absolute -top-12 right-0 rounded-md text-green-500 text-4xl"
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 1,
              y: -50,
              // x: (Math.random() - 0.5) * 200,
              scale: 1,
            }}
            exit={{ opacity: 0, y: -70 }} // all the motion here
            transition={{ duration: 1.5 }}
          >
            + {score}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlusAnimation;
