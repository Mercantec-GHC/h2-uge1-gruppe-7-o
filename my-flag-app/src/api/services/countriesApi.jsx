// Basis-URL til REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1';

// Funktion til at hente alle lande (bruges i CountryList)
export const getAllCountries = async () => {

   // Henter navn, region og landekode (cca3) for hvert land
  const response = await fetch(`${BASE_URL}/all?fields=name,region,cca3`);

  // Hvis svaret ikke er OK (f.eks. fejl 404 eller 500), kast fejl
  if (!response.ok) throw new Error('Failed to fetch countries');

  // Konverter JSON-respons til JavaScript-objekt
  return response.json();
};

// Funktion til at hente alle lande (bruges i FlagQuiz)
export async function fetchAllCountries() {
  try {

    // Henter navn, flag og landekode
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3');
    if (!response.ok) throw new Error('Fejl ved hentning af lande');
    return await response.json();
  } catch (error) {

    // Hvis der sker en fejl, log den og returner tom liste
    console.error('Fejl:', error);
    return [];
  }
}