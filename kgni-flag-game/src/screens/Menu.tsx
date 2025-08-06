import { Button } from "../components/Button";
import { useGameActions, useGameStore } from "../stores/gameStore";

const Menu = () => {
  const { setStatus, setCurrentScreen } = useGameActions();
  const fetchingError = useGameStore((state) => state.fetchingError);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">FLAG GUESSER</h1>
      {fetchingError && (
        <p className="mb-8 text-red-500 font-bold text-xl">
          {fetchingError.name}
        </p>
      )}
      <div className="flex flex-col gap-2">
        <Button
          className="min-w-40"
          onClick={() => {
            if (fetchingError) {
              // refetch in here
            }
            setStatus("playing");
            setCurrentScreen("flag");
          }}
        >
          {fetchingError ? "Retry" : "Start Game"}
        </Button>
        {/* {gameStatus !== "lost" && ( */}
        {/*   <Button fullWidth onClick={() => reset()}> */}
        {/*     Reset */}
        {/*   </Button> */}
        {/* )} */}
      </div>
    </>
  );
};

export default Menu;
