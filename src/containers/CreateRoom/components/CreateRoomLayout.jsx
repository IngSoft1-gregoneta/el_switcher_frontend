import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../../zustand/store.js";
import PropTypes from "prop-types";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons.jsx";
import ModalInput from "../../../components/ModalInput.jsx";

export default function CreateRoomLayout({ handleCreateRoom }) {
  CreateRoomLayout.propTypes = {
    handleCreateRoom: PropTypes.func,
  };
  const userId = useIdStore((state) => state.userId);
  const navigate = useNavigate();

  if (!userId) {
    navigate("/");
  }
  const handleLeave = () => {
    navigate(`/id/${userId}`);
  };

  const [name, setName] = useState("");
  const [players, setPlayers] = useState(2);
  const [isOpen, setIsOpen] = useState(true);
  const [ownerName, setOwnerName] = useState(null);

  const handleRoomName = (event) => {
    let name = event.target.value;
    if (name !== "") {
      setName(event.target.value);
    }
  };

  const handlePlayerCount = (event) => {
    setPlayers(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    console.log(ownerName);
    event.preventDefault();
    const formData = {
      room_name: name,
      players_expected: players,
      owner_name: ownerName,
    };
    if (typeof handleCreateRoom === "function" && formData.name !== "") {
      handleCreateRoom(formData);
    } else if (formData.name === "") {
      alert("Empty name");
    }
  };

  return (
    <div className="mx-auto mt-10 flex max-w-screen-lg flex-col items-center justify-center p-4">
      <div className="center mx-auto w-full max-w-md items-center justify-center bg-lime-200 p-4 shadow-md">
        <ModalInput
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClickAceptar={setOwnerName}
          handleClickCancelar={handleLeave}
          title="Nombre para partida"
          desc="Escriba el nombre con el cual quiera ser identificado la partida"
        />
        <h1 className="mb-8 mt-4 text-center font-serif text-4xl font-bold">
          Crear Sala
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-lime-100 p-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre de la sala
            </label>
            <input
              onChange={handleRoomName}
              id="name"
              type="text"
              className="mt-1 block w-full border-gray-600 bg-cyan-50 p-3 shadow-sm focus:border-emerald-100 focus:ring-emerald-200 sm:text-sm"
              value={name}
            />
          </div>
          <div>
            <label htmlFor="playerCount" className="block text-sm font-medium">
              Cantidad de jugadores
            </label>
            <input
              onChange={handlePlayerCount}
              id="playerCount"
              type="number"
              min={2}
              max={4}
              value={players}
              className="mt-1 block w-full border-gray-600 bg-cyan-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="2-4 players"
            />
          </div>
          <ButtonFilled type="submit" className="w-full">
            Crear
          </ButtonFilled>
          <ButtonUnfilled onClick={handleLeave} className="w-full">
            Salir
          </ButtonUnfilled>
        </form>
      </div>
    </div>
  );
}
