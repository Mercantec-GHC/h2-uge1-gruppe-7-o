import { useEffect, useState } from 'react';
import { getAllCountries } from '../api/services/countriesApi';

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCountries()
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Fejl under hentning af lande: {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🌍 Verdens lande</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <div
            key={country.cca3}
            className="bg-white border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-1">
              {country.name.common}
            </h3>
            <p className="text-gray-700">🌐 Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
