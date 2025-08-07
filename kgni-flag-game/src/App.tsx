import "./App.css";
import { useEffect, useState } from "react";
import fetchCountries from "./api/fetchCountries";
import { useGameActions } from "./stores/gameStore";
import FlagGuesser from "./screens/FlagGuesser";
import { Button } from "./components/Button";
import { useFetchUrlStore } from "./stores/fetchURLStore";
import { cn } from "./utils/cn";
import type APIError from "./api/APIError";

function App() {
  const { setCountries, setCurrentCountry } = useGameActions();
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingError, setFetchingError] = useState<Error | null>(null);
  const [refetch, setRefetch] = useState(0);

  const urlKey = useFetchUrlStore((state) => state.urlKey);
  const setUrlKey = useFetchUrlStore((state) => state.setUrlKey);

  const [showSetUrlButton, setShowSetUrlButton] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    setFetchingError(null);
    fetchCountries()
      .then((data) => {
        setCountries(data);
        setCurrentCountry();

        setIsFetching(false);
      })
      .catch((error: APIError) => {
        setFetchingError(error);
        setIsFetching(false);
      });
  }, [urlKey, refetch]);

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gray-50">
        {isFetching && <div>Loading...</div>}
        {fetchingError && (
          <div className="flex flex-col gap-4">
            <p>{fetchingError.message}</p>
            <Button onClick={() => setRefetch((prev) => prev + 1)}>
              Retry
            </Button>
          </div>
        )}
        {!isFetching && !fetchingError && <FlagGuesser />}
        <div
          onClick={() => setShowSetUrlButton((prev) => !prev)}
          className="absolute right-4 bottom-4 size-6 rounded-md cursor-pointer bg-transparent hover:bg-black duration-100"
        ></div>
        {showSetUrlButton && (
          <div className="flex absolute bottom-20 gap-4 flex-col items-center">
            <div className=" flex gap-4 mt-4">
              <Button
                className={cn(
                  urlKey === 200
                    ? "bg-green-400"
                    : "bg-green-400/80 grayscale-80 hover:grayscale-0 hover:bg-green-400",
                )}
                onClick={() => setUrlKey(200)}
              >
                200
              </Button>
              <Button
                onClick={() => setUrlKey(400)}
                className={cn(
                  urlKey === 400
                    ? "bg-yellow-400"
                    : "bg-yellow-400/80 grayscale-80 hover:grayscale-0 hover:bg-yellow-400",
                )}
              >
                400
              </Button>
              <Button
                className={cn(
                  urlKey === 500
                    ? "bg-red-400"
                    : "bg-red-400/80 grayscale-80 hover:grayscale-0 hover:bg-red-400",
                )}
                onClick={() => setUrlKey(500)}
              >
                500
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
