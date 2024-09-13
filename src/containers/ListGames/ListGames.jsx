import { useEffect, useState } from "react";
import ListGamesLayout from "./components/ListGamesLayout";
import { useWSMessage } from "../WSMessageContext";

export default function ListGames() {
  const [games, setGames] = useState(null);
  const WSMessageContext = useWSMessage();

  //Esta effect hace un fetch cada vez que llega un mensaje desde el WS
  //Habria que ver si puede venir alguno mensaje el cual no sea pertinente
  //en ese caso usar un if ?
  useEffect(() => {
    fetchGames();
  }, [WSMessageContext]);

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
        className="m-2 border-2 border-dashed border-cyan-700 p-4"
      >
        {game.name}
      </li>
    ));
  }

  return <ListGamesLayout gamesList={gamesList} />;
}
