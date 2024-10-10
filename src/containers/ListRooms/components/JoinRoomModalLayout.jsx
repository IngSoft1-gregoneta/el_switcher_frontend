import PropTypes from "prop-types";
import { joinRoom } from "../../Room/services/RoomService";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../../zustand/store";
import ModalInput from "../../../components/ModalInput";

export default function JoinRoomModalLayout({ roomId, isOpen, setIsOpen }) {
  JoinRoomModalLayout.propTypes = {
    roomId: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
  };
  const userId = useIdStore((state) => state.userId);
  const navigate = useNavigate();

  async function handleJoinRoom(userName) {
    try {
      await joinRoom({
        room_id: roomId,
        player_name: userName,
        user_id: userId,
      });
      navigate(`/room/${userId}/${roomId}/${userName}`);
    } catch (error) {
      console.log(error);
      navigate("/failed_room");
    }
  }

  return (
    <>
      <ModalInput
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClickAceptar={handleJoinRoom}
        handleClickCancelar={() => void 0}
        title="Unirse a la partida"
        desc="Escriba el nombre con el cual quiera ser identificado la partida"
      />
    </>
  );
}
