import RoomConfigLayout from "./components/RoomConfigLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useRoom } from "./context/RoomContext.jsx";
import { createRoom, joinRoom } from "./services/RoomService.js";

export default function Room() {
  const { setRoomData } = useRoom();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const data = await createRoom(formData);

      setRoomData({
        room_id: data.room_id,
        room_name: data.room_name,
        players_expected: data.players_expected,
        players_names: data.players_names,
        owner_name: data.owner_name,
        is_active: data.is_active,
      });

      navigate("/Room");
    } catch (error) {
      console.log(error);
      navigate("/FailedRoom");
    }
  }

  return <RoomConfigLayout onSubmit={handleSubmit}></RoomConfigLayout>;
}
