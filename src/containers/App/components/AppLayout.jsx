import "./AppLayout.module.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "@headlessui/react";
import ListRooms from "../../ListRooms/ListRooms.jsx";
import { useIdStore } from "../../../services/state.js";
import { ButtonFilled } from "../../../components/Buttons.jsx";

export default function AppLayout() {
  // I dont like this
  const { user_id } = useParams();
  const userId = useIdStore((state) => state.userId);
  const setId = useIdStore((state) => state.setId);
  if (!userId) {
    setId(user_id);
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center p-4">
      <h1 className="m-8 text-center font-serif text-4xl font-bold text-emerald-900">
        EL SWITCHER
      </h1>
      <ListRooms />
      <Link to="/create_room">
        <ButtonFilled>Crear Partida</ButtonFilled>
      </Link>
    </div>
  );
}
