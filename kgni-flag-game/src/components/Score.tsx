import NumberFlow from "@number-flow/react";
import { useGameStore } from "../stores/gameStore";

const Score = () => {
  const score = useGameStore((state) => state.score);
  const countries = useGameStore((state) => state.countries);
  return (
    <>
      <p className="text-right text-sm font-bold mb-4">
        <NumberFlow className="text-xl" value={score} /> / {countries?.length}
      </p>
    </>
  );
};

export default Score;
