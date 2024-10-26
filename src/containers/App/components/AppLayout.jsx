import clicksound from "../../assets/clicksound.wav"
import entersound from "../../assets/entersound.wav"
import { Link, useParams } from "react-router-dom";
import ListRooms from "../../ListRooms/ListRooms.jsx";
import { useIdStore } from "../../../zustand/store.js";
import { ButtonFilled } from "../../../components/Buttons.jsx";

export default function AppLayout() {
  const { user_id } = useParams();
  const setUserId = useIdStore((state) => state.setUserId);
  const userId = useIdStore((state) => state.userId);
  if (!userId || (userId && userId != user_id)) {
    setUserId(user_id);
  }

function clickplay() {
  new Audio(clicksound).play()
}
function enterplay() {
  new Audio(entersound).play()
}

  return (
    <div>
      <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center p-4 z-50">
        <h1 className="m-8 text-center font-serif text-6xl font-bold text-yellow-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          EL SWITCHER
        </h1>
        <ListRooms />
        <Link to="/create_room">
          <ButtonFilled onClick={clickplay} onMouseEnter={enterplay}>
            Crear Partida
          </ButtonFilled>
        </Link>
      </div>
    </div>
  );
}