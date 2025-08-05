import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AnswerOptions from "../components/AnswerOptions";
import { Button } from "../components/Button";
import {
  useGameActions,
  useGameStore,
  type Country,
} from "../stores/gameStore";
import coinSound from "../assets/sounds/8bit-coin.mp3";
import airhornSound from "../assets/sounds/airhorn.mp3";
import { ConfettiSideCannons } from "../components/ConfettiSideCannons";
import getRandomMeme from "../utils/getRandomMeme";
import AnimatedNumber from "../components/AnimatedNumber";
import NumberFlow from "@number-flow/react";

const FlagGuesser = () => {
  const currentCountry = useGameStore((state) => state.currentCountry);
  const countries = useGameStore((state) => state.countries);
  const gameStatus = useGameStore((state) => state.status);
  const { setStatus, reset, setCurrentCountry } = useGameActions();
  const score = useGameStore((state) => state.score);
  const correctGuess = useGameStore((state) => state.correctGuess);
  const soundMuted = useGameStore((state) => state.soundMuted);

  const coin = useMemo(() => {
    const coin = new Audio(coinSound);
    coin.volume = 0.02;
    return coin;
  }, []);

  const airhorn = useMemo(() => {
    const airhorn = new Audio(airhornSound);
    airhorn.volume = 0.22;
    return airhorn;
  }, []);

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    setShowAnimation(true);

    timeoutId = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [score]);

  useEffect(() => {
    let timeoutId: number;
    if (gameStatus === "won") {
      airhorn.play();
    }
    if (correctGuess) {
      // if (!soundMuted) {
      coin.play();
      // }
      if (gameStatus !== "won") {
        timeoutId = setTimeout(() => {
          setCurrentCountry();
        }, 150);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [correctGuess, coin, setCurrentCountry, gameStatus]);

  return (
    <>
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
      <div className="px-4 flex flex-col">
        {gameStatus === "lost" && (
          <p className="text-center font-bold text-red-500 text-xl">
            You Lost!
          </p>
        )}
        <div className="">
          <p className="text-right text-xs">
            <NumberFlow value={score} /> / {countries?.length}
          </p>
          <div className="flex justify-end">
            <progress
              className="text-right"
              value={score}
              max={countries?.length}
            />
          </div>
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

            <p>{currentCountry?.name.common}</p>
          </div>
          <div className="h-[200px] relative aspect-video mb-8 rounded-md shadow-xl">
            {/* {correctGuess && ( */}
            {/*   <motion.div */}
            {/*     key={currentCountry?.name.common} */}
            {/*     initial={{ opacity: 1 }} */}
            {/*     animate={{ opacity: 0 }} */}
            {/*     transition={{ duration: 0.1 }} */}
            {/*     className="absolute top-0 left-0 w-full h-full rounded-md bg-green-500/70" */}
            {/*   ></motion.div> */}
            {/* )} */}

            {gameStatus !== "won" && (
              <motion.img
                key={currentCountry?.flags.png}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.1,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                className="w-full h-full rounded-md"
                src={currentCountry?.flags.png}
                alt="Flag"
              />
            )}
          </div>
          <AnswerOptions />
        </div>
        <div className="">
          {gameStatus === "lost" && (
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
          )}
          {gameStatus == "playing" && (
            <Button className="mt-8" fullWidth onClick={() => reset()}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FlagGuesser;
