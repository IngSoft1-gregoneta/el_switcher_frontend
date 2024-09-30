import CreateRoomLayout from "./components/CreateRoomLayout.jsx";
import { useNavigate } from "react-router-dom";
import { createRoom } from "./services/RoomService.js";
import { useIdStore, useOwnerStore } from "../../services/state.js";

export default function CreateRoom() {
  const userId = useIdStore((state) => state.userId);
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const data = await createRoom(formData, userId);
      navigate(`/room/${userId}/${data.room_id}/${data.owner_name}`);
    } catch (error) {
      console.log(error);
      navigate("/failed_room");
    }
  }

  return <CreateRoomLayout onSubmit={handleSubmit}></CreateRoomLayout>;
}
