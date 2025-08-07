import { create } from "zustand";

// This store is used to store the URLs for the different API endpoints for testing purposes (400, 500, 200)
// The actual URL for the game is the one with the 200 key in the FETCH_URLS object

export const FETCH_URLS = {
  200: "https://restcountries.com/v3.1/all?fields=name,flags",
  400: "https://restcountries.com/v3.1//all?fields=name,flags",
  500: "https://statuscodes.free.beeceptor.com/500",
} as const;

export type FetchUrlKey = keyof typeof FETCH_URLS;

export type FetchUrlState = {
  urlKey: FetchUrlKey;
  url: string;
  setUrlKey: (key: FetchUrlKey) => void;
};

export const useFetchUrlStore = create<FetchUrlState>((set) => ({
  url: FETCH_URLS[200],
  urlKey: 200,
  setUrlKey: (key) =>
    set({
      urlKey: key,
      url: FETCH_URLS[key],
    }),
}));
