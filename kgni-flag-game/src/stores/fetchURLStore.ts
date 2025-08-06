import { create } from "zustand";

export const FETCH_URLS = {
  200: "https://restcountries.com/v3.1/all?fields=name,flags",
  400: "https://restcountries.com/v3.1//all?fields=name,flags",
  500: "https://statuscodes.free.beeceptor.com/500",
} as const;

export type FetchUrlKey = keyof typeof FETCH_URLS;

export type FetchUrlState = {
  urlKey: FetchUrlKey;
  setUrlKey: (key: FetchUrlKey) => void;
  url: string;
};

export const useFetchUrlStore = create<FetchUrlState>((set) => ({
  urlKey: 200,
  url: FETCH_URLS[200],
  setUrlKey: (key) =>
    set({
      urlKey: key,
      url: FETCH_URLS[key],
    }),
}));
