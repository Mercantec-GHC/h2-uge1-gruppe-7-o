import { type Country, type CountryAPIData } from "../types/types";
import { retry } from "./retry";
import APIError from "./APIError";
import { useFetchUrlStore } from "../stores/fetchURLStore";

async function _fetchCountries(): Promise<Country[]> {
  const url = useFetchUrlStore.getState().url;
  const response = await fetch(url);
  // Usage:
  if (!response.ok) {
    const msg =
      response.status >= 500 && response.status < 600
        ? "Something went wrong, please try again later."
        : "Couldn't fetch countries. Please check your connection or try again.";
    throw new APIError(msg, response.status);
  }
  const data = await response.json();

  const extendedData: Country[] = data.map((country: CountryAPIData) => ({
    ...country,
    isGuessed: false,
    answerOptions: getRandomOptions(data, country.name.common, 4),
  }));

  return randomSortResults(extendedData).slice(0, 3);
}

function randomSortResults<T>(results: T[]): T[] {
  const array = [...results]; // copy to avoid mutating original
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomOptions(
  countries: CountryAPIData[],
  correct: string,
  count = 4,
) {
  // Get all country names except the correct one
  const otherNames = countries
    .map((c) => c.name.common)
    .filter((name) => name !== correct);

  // Shuffle and  3
  const shuffled = randomSortResults(otherNames).slice(0, count - 1);

  // Add correct answer and shuffle again
  return randomSortResults([...shuffled, correct]);
}

export default function fetchCountriesWithRetry() {
  return retry(_fetchCountries, 3, 1000); // 3 attempts, 1s delay
}
