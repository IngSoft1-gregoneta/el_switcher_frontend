import RoomConfigLayout from "./components/RoomConfigLayout.jsx";
import { useNavigate } from "react-router-dom";
import { createRoom } from "./services/RoomService.js";

export default function RoomConfig() {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const data = await createRoom(formData);
      navigate(`/room/${data.room_id}/nico/${data.user_id}`);
    } catch (error) {
      console.log(error);
      navigate("/failed_room");
    }
  }

  return <RoomConfigLayout onSubmit={handleSubmit}></RoomConfigLayout>;
}
