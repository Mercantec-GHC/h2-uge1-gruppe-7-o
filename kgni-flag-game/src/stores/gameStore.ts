import { create } from "zustand";
import type { Country } from "../types/types";

type GameState = {
  countries: Country[] | null;
  status: GameStatus;
  currentCountry: Country | null;
  userGuess: string | null;
  correctGuess: boolean | null;
  score: number;
  soundMuted: boolean;
};

type GameStatus = "playing" | "paused" | "lost" | "won" | null;

type Actions = {
  actions: {
    setStatus: (status: GameStatus) => void;
    setCountries: (countries: Country[]) => void;
    setCurrentCountry: (country?: Country) => void;
    setUserGuess: (userGuess: string | null) => void;
    incrementScore: () => void;
    setScore: (score: number) => void;
    reset: () => void;
  };
};

function getRandomNotGuessedCountry(countries: Country[] | null | undefined) {
  if (!countries) return null;
  const notGuessedCountries = countries.filter(
    (country) => country.isGuessed === false,
  );
  return notGuessedCountries[
    Math.floor(Math.random() * notGuessedCountries.length)
  ];
}

export const useGameStore = create<GameState & Actions>((set, get, store) => ({
  countries: null,
  currentCountry: null,
  userGuess: null,
  soundMuted: true,
  status: "playing",
  score: 0,
  correctGuess: null,
  actions: {
    setCountries: (countries: Country[]) => set({ countries }),
    // This function is used to set the country to be guessed, it is called on load, and then on each right answer (to load the next one)
    setCurrentCountry: () =>
      set((state) => {
        return {
          correctGuess: null,
          userGuess: null,
          currentCountry: getRandomNotGuessedCountry(state.countries),
        };
      }),
    // This function is what is
    setUserGuess: (userGuess: string | null) =>
      set((state) => {
        const correctGuess = userGuess === state.currentCountry?.name.common;
        if (!correctGuess) {
          return {
            correctGuess: false,
            status: "lost",
            userGuess: null,
          };
        } else {
          // If guess is correct, set the country as guessed
          const countries = state.countries?.map((country) => {
            if (country.name.common === userGuess) {
              return {
                ...country,
                isGuessed: true,
              };
            }
            return country;
          });

          const newScore = state.score + 1;

          // If all countries are guessed, the game is won
          const status = countries?.length === newScore ? "won" : "playing";

          return {
            correctGuess: true,
            score: newScore,
            countries: countries,
            status: status,
            userGuess: userGuess, // reset
          };
        }
      }),
    setStatus: (status: GameStatus) => set({ status }),
    setScore: (score: number) => set({ score }),
    incrementScore: () => {
      set((state) => ({ score: state.score + 1 }));
    },
    reset: () =>
      set((state) => {
        // Set all countries in memory as not guessed
        const countries = state.countries?.map((country) => {
          return {
            ...country,
            isGuessed: false,
          };
        });

        const currentCountry = getRandomNotGuessedCountry(countries);
        // Get the initial state for the store
        const initialState = store.getInitialState();

        // Return the initial state, but override countries, currentCountry and status
        return {
          ...initialState,
          countries,
          currentCountry,
          status: "playing",
        };
      }),
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
