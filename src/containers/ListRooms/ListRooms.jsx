import { useEffect, useState } from "react";
import ListRoomsLayout from "./components/ListRoomsLayout";
import { useWSMessage } from "../WSMessageContext";

export default function ListRooms() {
  const [rooms, setRooms] = useState(null);
  const WSMessageContext = useWSMessage();

  //Esta effect hace un fetch cada vez que llega un mensaje desde el WS
  //TODO: Verificar que sea un mensaje de agregar partida
  useEffect(() => {
    fetchRooms();
  }, [WSMessageContext]);

  function fetchRooms() {
    fetch("http://127.0.0.1:8000/rooms", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.every((item) => item.room_id)) {
          setRooms(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <ListRoomsLayout rooms={rooms} />;
    </>
  );
}
