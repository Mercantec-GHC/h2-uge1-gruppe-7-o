import { createContext, useContext } from "react";
import type { GameState } from "../types/types";

export const GameContext = createContext<GameState | undefined>(undefined);

export default function useGame() {
  const gameState = useContext(GameContext);

  if (!gameState) {
    throw new Error("useGame must be used within a GameContext");
  }

  return gameState;
}
