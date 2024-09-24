import { useEffect, useState } from "react";
import ListRoomsLayout from "./components/ListRoomsLayout";
import { useUpdateStore } from "../../services/state";

export default function ListRooms() {
  const [rooms, setRooms] = useState(null);
  const updateList = useUpdateStore((state) => state.updateList);

  //Esta effect hace un fetch cada vez que llega un mensaje desde el WS
  //TODO: Verificar que sea un mensaje de agregar partida
  useEffect(() => {
    fetchRooms();
    console.log("LISTROOMS ", updateList);
  }, [updateList]);

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

  return <ListRoomsLayout rooms={rooms} />;
}
