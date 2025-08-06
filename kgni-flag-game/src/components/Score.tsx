import NumberFlow from "@number-flow/react";
import { useGameStore } from "../stores/gameStore";

const Score = () => {
  const score = useGameStore((state) => state.score);
  const countries = useGameStore((state) => state.countries);
  return (
    <>
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
    </>
  );
};

export default Score;
