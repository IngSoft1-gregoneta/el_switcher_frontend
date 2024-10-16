import PropTypes from "prop-types";
import clicksound from "../../assets/clicksound.wav"
import entersound from "../../assets/entersound.wav"
import { useState } from "react";
import JoinRoomModalLayout from "./JoinRoomModalLayout";
import { ButtonUnfilled } from "../../../components/Buttons";

export default function ListRoomsLayout({ rooms }) {
  ListRoomsLayout.propTypes = {
    rooms: PropTypes.array,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);

  function handleClickUnirse(id) {
    new Audio(clicksound).play()
    setRoomId(id);
    setIsOpen(true);
  }
  function enterplay() {
    new Audio(entersound).play()
  }

  let roomsList;
  if (rooms != null && rooms.length != 0) {
    console.log(rooms);
    roomsList = rooms.map((room) => {
      if (room !== undefined) {
        return (
          <tr
            key={room.room_id}
            className="border-b border-r border-emerald-200 bg-lime-100 text-cyan-950 hover:bg-cyan-100"
          >
            <td scope="row" className="center px-6 py-4">
              {/* TODO: Devolver del backend cuantos jugadores hay */}
              {room.players_names.length}/{room.players_expected}
            </td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {room.room_name}
            </td>
            <td className="px-6 py-4">{room.owner_name}</td>
            <td className="px-6 py-4 text-right">
              <ButtonUnfilled onClick={() => handleClickUnirse(room.room_id)} onmouseenter={enterplay}>
                Unirse
              </ButtonUnfilled>
            </td>
          </tr>
        );
      }
    });

    return (
      <>
        <JoinRoomModalLayout
          roomId={roomId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="container mb-6 pb-4 pt-4">
          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-lime-200 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Jugadores
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre de la partida
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Creada por
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>{roomsList}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <div>No hay salas disponibles</div>;
  }
}
