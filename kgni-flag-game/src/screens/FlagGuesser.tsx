import { useEffect, useMemo } from "react";
import AnswerOptions from "../components/AnswerOptions";
import { Button } from "../components/Button";
import { useGameActions, useGameStore } from "../stores/gameStore";
import coinSound from "../assets/sounds/8bit-coin.mp3";
import airhornSound from "../assets/sounds/airhorn.mp3";
import { ConfettiSideCannons } from "../components/ConfettiSideCannons";
import getRandomMeme from "../utils/getRandomMeme";

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
      {gameStatus === "won" && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
          <ConfettiSideCannons />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2  w-96 bg-white rounded-md p-4 shadow-lg flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">You won!</h1>
            <div className="mb-4">
              <p className="text-center text-xl">GOD DAMN YOU ARE SICK!</p>
              <p>YOU MUST HAVE A HUMONGOUS BRAIN</p>
            </div>
            <img
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
        </>
      )}
      <div className="px-4 flex flex-col">
        {gameStatus === "lost" && (
          <p className="text-center font-bold text-red-500 text-xl">
            You Lost!
          </p>
        )}
        <div className="">
          <p className="text-right text-xs">
            {score} / {countries?.length}
          </p>
          <div className="flex justify-end">
            <progress
              className="text-right"
              value={score}
              max={countries?.length}
            />
          </div>
          <p>{currentCountry?.name.common}</p>
          <div className="h-[200px] aspect-video mb-8 rounded-md shadow-xl">
            <img
              className="w-full h-full rounded-md"
              src={currentCountry?.flags.png}
              alt="Flag"
            />
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
