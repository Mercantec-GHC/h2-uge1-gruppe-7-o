import gif01 from "../assets/winning-gifs/01.gif";
import gif02 from "../assets/winning-gifs/02.gif";
import gif03 from "../assets/winning-gifs/03.gif";
export default function getRandomMeme(type: "win" | "lose"): string {
  const winningGifs: string[] = [gif01, gif02, gif03];

  const loserGifs: string[] = [];

  if (type === "win") {
    return winningGifs[Math.floor(Math.random() * winningGifs.length)];
  } else {
    return loserGifs[Math.floor(Math.random() * loserGifs.length)];
  }
}
