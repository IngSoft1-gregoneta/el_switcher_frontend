import CreateRoomLayout from "./components/CreateRoomLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../zustand/store.js";
import { createRoom } from "../Room/services/RoomService.js";

export default function CreateRoom() {
  const userId = useIdStore((state) => state.userId);
  const navigate = useNavigate();

  async function handleCreateRoom(formData) {
    try {
      const data = await createRoom(formData, userId);
      navigate(`/room/${userId}/${data.room_id}/${data.owner_name}`);
    } catch (error) {
      console.log(error);
      navigate("/failed_room");
    }
  }

  return (
    <CreateRoomLayout handleCreateRoom={handleCreateRoom}></CreateRoomLayout>
  );
}
