import { useEffect, useState } from "react";
import { fetchAllCountries } from "../api/services/countriesApi";

export default function FlagQuiz() {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [answerResult, setAnswerResult] = useState(null);

  useEffect(() => {
    fetchAllCountries().then((data) => {
      setCountries(data);
      generateQuestion(data);
    });
  }, []);

  function generateQuestion(data) {
    const correctCountry = data[Math.floor(Math.random() * data.length)];
    const wrongCountries = data
      .filter((c) => c !== correctCountry)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allChoices = [...wrongCountries, correctCountry].sort(
      () => Math.random() - 0.5,
    );

    setQuestion(correctCountry);
    setChoices(allChoices);
    setAnswerResult(null);
  }

  function checkAnswer(selectedName) {
    if (selectedName === question.name.common) {
      setAnswerResult("✅ Rigtigt! 🎉");
    } else {
      setAnswerResult(
        `❌ Forkert! Det rigtige svar var: ${question.name.common}`,
      );
    }
  }

  if (!question) {
    return <div className="text-center mt-10">Henter quiz...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        Hvilket land har dette flag?
      </h2>

      <div className="flex justify-center mb-6">
        <img
          src={question.flags.svg}
          alt={`Flag of ${question.name.common}`}
          className="w-60 h-36 object-contain border rounded"
        />
      </div>

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

      {answerResult && (
        <div className="text-center">
          <p className="mb-4 text-lg">{answerResult}</p>
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
