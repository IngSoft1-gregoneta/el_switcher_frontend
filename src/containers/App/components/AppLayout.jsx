import "./AppLayout.module.css";
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
    <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center p-4">
      <h1 className="m-8 text-center font-serif text-4xl font-bold text-emerald-900">
        EL SWITCHER
      </h1>
      <ListRooms />
      <Link to="/create_room">
        <ButtonFilled onClick={clickplay} onmouseenter={enterplay}>Crear Partida</ButtonFilled>
      </Link>
    </div>
  );
}
