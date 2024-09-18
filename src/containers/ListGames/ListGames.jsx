import { useEffect, useState } from "react";
import ListGamesLayout from "./components/ListGamesLayout";
import { useWSMessage } from "../WSMessageContext";

export default function ListGames() {
  const [games, setGames] = useState(null);
  const WSMessageContext = useWSMessage();

  //Esta effect hace un fetch cada vez que llega un mensaje desde el WS
  //TODO: Verificar que sea un mensaje de agregar partida
  useEffect(() => {
    fetchGames();
  }, [WSMessageContext]);

  function fetchGames() {
    fetch("http://127.0.0.1:8000/create_room", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        //TODO: Actualizar para la API correcta
        if (Array.isArray(data) && data.every((item) => item.id && item.name)) {
          console.log(data);
          setGames(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <ListGamesLayout games={games} />;
    </>
  );
}
