import RoomConfigLayout from "./components/RoomConfigLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useRoom } from "./context/RoomContext.jsx";
import  {createRoom, joinRoom } from "./services/RoomService.js";

export default function Lobby() {
  const { setLobbyData } = useRoom();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const data = await createRoom(formData);

      setLobbyData({
        name: data.room_name,
        players: data.players || [],
        expected_players : data.players_expected,
      });

      const r = await joinRoom({room_id : data.room_id, player_name : "pepe"});
      console.log(r);

      navigate("/Room");

    } catch (error) {
      console.log(error);
      navigate("/FailedRoom")
    }
  }



  return <RoomConfigLayout onSubmit={handleSubmit}></RoomConfigLayout>;
}
