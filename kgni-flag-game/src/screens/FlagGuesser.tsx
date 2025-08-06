import { useEffect, useMemo } from "react";
import { motion } from "motion/react";
import AnswerOptions from "../components/AnswerOptions";
import { useGameActions, useGameStore } from "../stores/gameStore";
import coinSound from "../assets/sounds/8bit-coin.mp3";
import airhornSound from "../assets/sounds/airhorn.mp3";
import WinningModal from "../components/WinningModal";
import Score from "../components/Score";
import PlusAnimation from "../components/PlusAnimation";
import Flag from "../components/Flag";
import GameButton from "../components/GameButton";

const FlagGuesser = () => {
  const currentCountry = useGameStore((state) => state.currentCountry);
  const gameStatus = useGameStore((state) => state.status);
  const { setCurrentCountry } = useGameActions();
  const correctGuess = useGameStore((state) => state.correctGuess);

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
        }, 75);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [correctGuess, coin, setCurrentCountry, gameStatus, airhorn]);

  return (
    <>
      <WinningModal />
      {/* <Timer /> */}
      <div className="px-4 flex flex-col">
        <motion.div className="relative">
          {gameStatus === "lost" && (
            <motion.p
              animate={{ opacity: [0, 1] }}
              transition={{
                duration: 0.2,
              }}
              className="text-center absolute -top-12 right-1/2 translate-x-1/2 font-bold text-red-500 text-3xl"
            >
              You Lost!
            </motion.p>
          )}
        </motion.div>
        <Score />
        <PlusAnimation />
        <Flag />
        <AnswerOptions />
        <GameButton />
        <p className="absolute bottom-4 right-1/2 translate-x-1/2 text-gray-200">
          {currentCountry?.name.common}
        </p>
      </div>
    </>
  );
};

export default FlagGuesser;
