import { type Country, type CountryAPIData } from "../types/types";

export default async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital",
  );
  const data = await response.json();

  const extendedData = data.map((country: CountryAPIData) => ({
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

  // Shuffle and pick 3
  const shuffled = randomSortResults(otherNames).slice(0, count - 1);

  // Add correct answer and shuffle again
  return randomSortResults([...shuffled, correct]);
}
