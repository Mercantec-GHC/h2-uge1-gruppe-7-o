import { useEffect, useState } from "react";
import { fetchAllCountries } from "../api/services/countriesApi"; // Funktion der henter alle lande fra API

// Hovedkomponenten til flag-quizzen
export default function FlagQuiz() {
  
  // State til at gemme alle lande fra API'et
  const [countries, setCountries] = useState([]);

  // State til det aktuelle spørgsmål (landet der vises som flag)
  const [question, setQuestion] = useState(null);

   // State til valgmuligheder (lande man kan vælge som svar)
  const [choices, setChoices] = useState([]);

   // State til resultatet af brugerens svar (rigtigt/forkert)
  const [answerResult, setAnswerResult] = useState(null);

  
  // Score og totalQuestions state
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // useEffect køres én gang når komponenten indlæses (tom afhængighedsliste [])
  useEffect(() => {

    // Hent alle lande fra backend/API
    fetchAllCountries().then((data) => {
      setCountries(data); // Gemmer landene i state
      generateQuestion(data);  // Kalder funktionen til at oprette første spørgsmål
    });
  }, []);

  // Funktion der genererer et spørgsmål og valgmuligheder
  function generateQuestion(data) {

     // Vælg et tilfældigt land som det rigtige svar
    const correctCountry = data[Math.floor(Math.random() * data.length)];

    // Vælg 3 tilfældige forkerte lande (som ikke er det rigtige land)
    const wrongCountries = data
      .filter((c) => c !== correctCountry)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

      // Kombiner det rigtige land med de 3 forkerte, og bland dem
      const allChoices = [...wrongCountries, correctCountry].sort(
      () => Math.random() - 0.5,
    );

     // Gem spørgsmål og valgmuligheder i state
    setQuestion(correctCountry);
    setChoices(allChoices);
    setAnswerResult(null);// Nulstil tidligere svar
  }

  // Funktion der tjekker om brugeren har valgt det rigtige land
  function checkAnswer(selectedName) {

    setTotalQuestions((prev) => prev + 1); // Opdater antal spørgsmål

    if (selectedName === question.name.common) {

      setScore((prev) => prev + 1); // Øg scoren hvis korrekt
      setAnswerResult("✅ Rigtigt! 🎉");
    } else {
      setAnswerResult(
        `❌ Forkert! Det rigtige svar var: ${question.name.common}`,
      );
    }
  }

  // Hvis spørgsmålet endnu ikke er sat, vis "loader"
  if (!question) {
    return <div className="text-center mt-10">Henter quiz...</div>;
  }

   // Returnér brugergrænsefladen (UI)
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      
      <div className="text-center mb-4">
        {/* Viser den aktuelle score */}
        <p className="text-lg font-semibold">
          Score: {score} / {totalQuestions}
        </p>
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-center">
        Hvilket land har dette flag?
      </h2>

       {/* Viser flaget for det rigtige land */}
      <div className="flex justify-center mb-6">
        <img
          src={question.flags.svg}
          alt={`Flag of ${question.name.common}`}
          className="w-60 h-36 object-contain border rounded"
        />
      </div>

      {/* Viser knapper med svarmuligheder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {choices.map((country) => (
          <button
            key={country.cca3}
            onClick={() => checkAnswer(country.name.common)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {country.name.common}
          </button>
        ))}
      </div>

      {/* Viser resultatet efter brugeren har svaret */}
      {answerResult && (
        <div className="text-center">
          <p className="mb-4 text-lg">{answerResult}</p>

          {/* Knap til at gå videre til næste spørgsmål */}
          <button
            onClick={() => generateQuestion(countries)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
          >
            Næste spørgsmål
          </button>
        </div>
      )}
    </div>
  );
}
