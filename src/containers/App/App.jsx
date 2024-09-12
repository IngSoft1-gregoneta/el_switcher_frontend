import { useState } from 'react'
import AppLayout from "./components/AppLayout.jsx"

export default function App() {
  const [games, setGames] = useState(null);

  //TODO: This goes into App.jsx
  function fetchGames() {
    fetch("http://127.0.0.1:8000/list_games", { method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGames(data)
      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  let gamesList;
  if (games != null) {
    gamesList = games.map((game) => (
      <li key={game.id} className="border-2 p-4 m-2 border-dashed border-cyan-700">
        {game.name}
      </li>
    ))
  }

  return <AppLayout gamesList={gamesList} fetchGames={fetchGames} />
}

