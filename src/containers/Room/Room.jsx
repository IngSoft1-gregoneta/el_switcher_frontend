import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIdStore, useMatchStore } from "../../zustand/store.js";
import useRoomData from "./hooks/useRoomData.jsx";
import RoomLayout from "./components/RoomLayout.jsx";
import { leaveRoom, createMatch } from "./services/RoomService.js";

export default function Room() {
  const { room_id, user_name, user_id } = useParams();
  const { roomData, isOwner } = useRoomData(room_id, user_name);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const matchStarted = useMatchStore((state) => state.matchStarted);
  const navigate = useNavigate();

  if (!userId) {
    setUserId(user_id);
  }

  useEffect(() => {
    // Pasar a false cuando el match termine
    // quizas poner el campo de isStarted en el server y si fetcheamos la room
    // con eso en true activar un boton que te redirija a la partida
    // o manejar esto con cuidado
    // o usar ambos aproacheees que verifique con la room
    console.log("hhhho");
    if (matchStarted) {
      navigate(`/match/${user_id}/${room_id}/${user_name}`);
    }
  }, [matchStarted, navigate, user_name, room_id, user_id]);

  const handleLeaveRoom = () => {
    try {
      leaveRoom(room_id, user_name, user_id);
    } catch (err) {
      console.error(err);
    }
    navigate(`/id/${user_id}`);
  };

  const handleStartMatch = async () => {
    if (roomData.players_names.length < roomData.players_expected) {
      alert("No hay suficientes jugadores");
    } else {
      try {
        const matchData = await createMatch(room_id, user_name);
        console.log(matchData); //Es al pedo devolver esta data o no?
        navigate(`/match/${user_id}/${matchData.match_id}/${user_name}`);
      } catch (error) {
        alert("Hubo un problema");
        console.log(error);
      }
    }
  };

  return (
    <RoomLayout
      roomData={roomData}
      isOwner={isOwner}
      handleLeaveRoom={handleLeaveRoom}
      handleStartMatch={handleStartMatch}
    />
  );
}
