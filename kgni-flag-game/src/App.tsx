import { useEffect, useState } from "react";
import "./App.css";
import fetchCountries from "./api/fetchCountries";
import { useGameActions, useGameStore } from "./stores/gameStore";
import Menu from "./screens/Menu";
import FlagGuesser from "./screens/FlagGuesser";

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const { setCountries, setCurrentCountry } = useGameActions();

  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setCurrentCountry();

      // setTimeout(() => {
      //   setIsFetching(false);
      // }, 1000);
      setIsFetching(false);
    });
  }, []);
  return (
    <>
      {/* {isFetching && <div>Loading...</div>} */}
      {!isFetching && (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
          {currentScreen === "menu" ? <Menu /> : <FlagGuesser />}
        </div>
      )}
    </>
  );
}

export default App;
