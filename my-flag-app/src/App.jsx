import { useState } from 'react';
import CountryList from './components/CountryList';
import FlagQuiz from './components/FlagQuiz';

export default function App() {
  const [view, setView] = useState('list'); // 'list' eller 'quiz'

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded ${
            view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Se alle lande
        </button>
        <button
          onClick={() => setView('quiz')}
          className={`px-4 py-2 rounded ${
            view === 'quiz' ? 'bg-green-600 text-white' : 'bg-gray-300'
          }`}
        >
          Flag-quiz
        </button>
      </div>

      {view === 'list' && <CountryList />}
      {view === 'quiz' && <FlagQuiz />}
    </div>
  );
}
