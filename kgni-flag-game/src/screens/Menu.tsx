import { Button } from "../components/Button";
import { useGameActions, useGameStore } from "../stores/gameStore";

const Menu = () => {
  const { setStatus, setCurrentScreen, reset } = useGameActions();
  const gameStatus = useGameStore((state) => state.status);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">FLAG GUESSER</h1>
      <div className="flex flex-col gap-2">
        <Button
          fullWidth
          onClick={() => {
            setStatus("playing");
            setCurrentScreen("flag");
          }}
        >
          Start Game
        </Button>
        {/* {gameStatus !== "lost" && ( */}
        {/*   <Button fullWidth onClick={() => reset()}> */}
        {/*     Reset */}
        {/*   </Button> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default Menu;
