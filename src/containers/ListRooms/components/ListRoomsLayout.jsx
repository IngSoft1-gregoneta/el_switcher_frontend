import { Button } from "@headlessui/react";
import {
  Input,
  Field,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function ListRoomsLayout({ rooms }) {
  ListRoomsLayout.propTypes = {
    rooms: PropTypes.array,
  };
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [roomId, setRoomId] = useState(null);

  function handleClickUnirse(id) {
    setRoomId(id);
    setOpen(true);
  }

  function handleChange(e) {
    setUserName(e.target.value);
  }

  // TODO: esto lo deje asi para sacar a joinRoom de aca y usar el que hiciste nico
  function handleClickAceptar() {
    joinRoom({ room_id: roomId, player_name: userName });
    setOpen(false);
  }

  async function joinRoom({ room_id: roomId, player_name: userName }) {
    const roomIdEnc = encodeURIComponent(roomId);
    const userNameEnc = encodeURIComponent(userName);
    const response = await fetch(
      `http://localhost:8000/rooms/join/?room_id=${roomIdEnc}&player_name=${userNameEnc}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  let roomsList;
  if (rooms != null) {
    roomsList = rooms.map((room) => {
      if (room !== undefined) {
        return (
          <tr
            key={room.id}
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
    <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center p-4">
      <h1 className="m-8 text-center font-serif text-4xl font-bold text-emerald-900">
        EL SWITCHER
      </h1>

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

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 space-y-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-cyan-950"
                    >
                      Unirse a la partida
                    </DialogTitle>
                    <Field className="space-y-3">
                      <Description>
                        Escriba el nombre con el cual quiera ser identificado en
                        la partida
                      </Description>
                      <Input
                        className="block w-full border-0 py-1.5 pl-7 pr-20 text-cyan-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-200 sm:text-sm sm:leading-6"
                        name="username"
                        onChange={handleChange}
                      />
                    </Field>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleClickAceptar()}
                  className="inline-flex w-full justify-center bg-cyan-700 px-3 py-2 text-sm font-semibold text-cyan-50 shadow-sm hover:bg-cyan-600 sm:ml-3 sm:w-auto"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-cyan-950 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
