import { useState } from "react";
import AppLayout from "./components/AppLayout.jsx";

export default function App() {
  const [games, setGames] = useState(null);

  function fetchGames() {
    fetch("http://127.0.0.1:8000/list_games", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  let gamesList;
  if (games != null) {
    gamesList = games.map((game) => (
      <li
        key={game.id}
        className="p-4 border-2  m-2 border-dashed border-cyan-700"
      >
        {game.name}
      </li>
    ));
  }

  return <AppLayout gamesList={gamesList} fetchGames={fetchGames} />;
}
