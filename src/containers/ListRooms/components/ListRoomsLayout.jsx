import { Button } from "@headlessui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import JoinRoomModalLayout from "./JoinRoomModalLayout";

export default function ListRoomsLayout({ rooms }) {
  ListRoomsLayout.propTypes = {
    rooms: PropTypes.array,
  };

  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);

  function handleClickUnirse(id) {
    setRoomId(id);
    setOpen(true);
  }

  let roomsList;
  if (rooms != null) {
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
              <Button
                onClick={() => handleClickUnirse(room.room_id)}
                className="mb-2 me-2 border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
              >
                Unirse
              </Button>
            </td>
          </tr>
        );
      }
    });
  }

  return (
    <>
      <JoinRoomModalLayout roomId={roomId} open={open} setOpen={setOpen} />
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
}
