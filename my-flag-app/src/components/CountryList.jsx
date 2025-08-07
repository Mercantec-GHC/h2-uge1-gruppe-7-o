import { useEffect, useState } from 'react';
import { getAllCountries } from '../api/services/countriesApi';

// Komponent der viser en liste over lande
export default function CountryList() {

  // State til at gemme lande hentet fra API
  const [countries, setCountries] = useState([]);

  // State til at håndtere fejl under hentning
  const [error, setError] = useState(null);

  // useEffect kører én gang når komponenten loader
  useEffect(() => {

    // Kalder funktionen der henter lande fra backend
    getAllCountries()
      .then((data) => setCountries(data)) // Gemmer de hentede lande i state
      .catch((err) => setError(err.message));// Hvis der opstår en fejl, gem den
  }, []);

  // Hvis der er en fejl, vis den til brugeren
  if (error) {
    return (
      <div className="p-4 text-red-600">
        Fejl under hentning af lande: {error}
      </div>
    );
  }

   // UI til at vise listen over lande
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🌍 Verdens lande</h2>

      {/* Grid-layout til at vise landene i kort */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <div
            key={country.cca3}
            className="bg-white border rounded p-4 shadow hover:shadow-lg transition"
          >
             {/* Navn på landet */}
            <h3 className="text-lg font-semibold mb-1">
              {country.name.common}
            </h3>
            {/* Region (f.eks. Europa, Asien) */}
            <p className="text-gray-700">🌐 Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
