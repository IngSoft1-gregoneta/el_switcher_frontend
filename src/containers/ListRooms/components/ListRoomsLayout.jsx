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
  const [filterName, setFilterName] = useState("");
  const [filterPlayers, setFilterPlayers] = useState("");

  function handleClickUnirse(id) {
    new Audio(clicksound).play()
    setRoomId(id);
    setIsOpen(true);
  }
  function enterplay() {
    new Audio(entersound).play()
  }

  const filteredRooms = rooms?.filter((room) => {
    const matchesName = room.room_name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesPlayers = filterPlayers
      ? room.players_expected === parseInt(filterPlayers)
      : true;
    return matchesName && matchesPlayers;
  });

  const hasFilteredRooms = filteredRooms && filteredRooms.length > 0;

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
      <JoinRoomModalLayout
        roomId={roomId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="container mb-6 pb-4 pt-4">
        {}
        <div className="flex justify-between mb-4">
        <input
      type="text"
      placeholder="Filtrar por nombre de sala"
      value={filterName}
      onChange={(e) => setFilterName(e.target.value)}
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem 1rem",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#e3f9d7",
        color: "#333",
      }}
      className="placeholder:text-[#333]"
    />
    <select
      value={filterPlayers}
      onChange={(e) => setFilterPlayers(e.target.value)}
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem 1rem",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#e3f9d7",
        color: "#333"
      }}
    >
            <option value="" style={{fontFamily: "'Roboto', sans-serif"}}>Filtrar por jugadores</option>
            <option value="2" style={{fontFamily: "'Roboto', sans-serif"}}>2 jugadores</option>
            <option value="3" style={{fontFamily: "'Roboto', sans-serif"}}>3 jugadores</option>
            <option value="4" style={{fontFamily: "'Roboto', sans-serif"}}>4 jugadores</option>
          </select>
        </div>

        {hasFilteredRooms ? (
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
              <tbody>
                {filteredRooms.map((room) => (
                  room && (
                    <tr
                      key={room.room_id}
                      className="border-b border-r border-emerald-200 bg-lime-100 text-cyan-950 hover:bg-cyan-100"
                    >
                      <td scope="row" className="center px-6 py-4">
                        {room.players_names.length}/{room.players_expected}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {room.room_name}
                      </td>
                      <td className="px-6 py-4">{room.owner_name}</td>
                      <td className="px-6 py-4 text-right">
                        <ButtonUnfilled onClick={() => handleClickUnirse(room.room_id)}>
                          Unirse
                        </ButtonUnfilled>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
          style={{
            textAlign: "center", /* Centrado horizontal */
            marginTop: "2rem", /* Separación desde arriba */
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1.25rem", /* Tamaño de fuente */
            color: "#000" /* Color gris para el texto */
          }}
        >
          No hay salas disponibles
        </div>
        )}
      </div>
    </>
  );
}
