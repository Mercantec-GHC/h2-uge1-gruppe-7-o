const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all?fields=name,region,cca3`);
  if (!response.ok) throw new Error('Failed to fetch countries');
  return response.json();
};

export async function fetchCountryByName(name) {
  const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error('Kunne ikke hente landet');
  return res.json();
}

export async function fetchCountriesByRegion(region) {
  const res = await fetch(`${BASE_URL}/region/${encodeURIComponent(region)}`);
  if (!res.ok) throw new Error('Kunne ikke hente lande fra region');
  return res.json();
}

export async function fetchCountryByCode(code) {
  const res = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('Kunne ikke hente landet på kode');
  return res.json();
}

export async function fetchAllCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3');
    if (!response.ok) throw new Error('Fejl ved hentning af lande');
    return await response.json();
  } catch (error) {
    console.error('Fejl:', error);
    return [];
  }
}