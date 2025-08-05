import { useEffect, useState } from "react";
import "./App.css";
import fetchCountries from "./api/fetchCountries";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCountries().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
        <h1 className="text-4xl font-bold">FLAG GUESSER</h1>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
