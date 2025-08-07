// Basis-URL til REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1';

//Henter lande med ønskede felter.
export const fetchCountries = async (fields = ['name', 'cca3']) => {
  const url = `${BASE_URL}/all?fields=${fields.join(',')}`;
  try {

   
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fejl ved hentning af lande');
    return await response.json();
  } catch (error) {

    // Hvis der sker en fejl, log den og returner tom liste
    console.error('Fejl:', error);
    return [];
  }
}