import RoomConfigLayout from "./components/RoomConfigLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useRoom } from "./context/RoomContext.jsx";
import { createRoom } from "./services/RoomService.js";

export default function Room() {
  const { setRoomData } = useRoom();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const data = await createRoom(formData);
      setRoomData(data);
      navigate("/Room");
    } catch (error) {
      console.log(error);
      navigate("/FailedRoom");
    }
  }

  return <RoomConfigLayout onSubmit={handleSubmit}></RoomConfigLayout>;
}
