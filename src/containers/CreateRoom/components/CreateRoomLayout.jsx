import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../../zustand/store.js";
import PropTypes from "prop-types";
import clicksound from "../../assets/clicksound.wav";
import entersound from "../../assets/entersound.wav";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons.jsx";
import ModalInput from "../../../components/ModalInput.jsx";

export default function CreateRoomLayout({ handleCreateRoom }) {
  CreateRoomLayout.propTypes = {
    handleCreateRoom: PropTypes.func,
  };
  const userId = useIdStore((state) => state.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleLeave = () => {
    navigate(`/id/${userId}`);
  };

  const [name, setName] = useState("");
  const [players, setPlayers] = useState(2);
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [ownerName, setOwnerName] = useState(null);

  const handleRoomName = (event) => {
    let name = event.target.value;
    if (name !== "") {
      setName(name);
    }
  };

  const handleRoomPassword = (event) => {
    let password = event.target.value;
    // TODO: hacer checkeos ?
    setPassword(password);
  };

  const handlePlayerCount = (event) => {
    setPlayers(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "") {
      alert("Nombre vacio");
      return;
    }

    if (password.length !== 0) {
      if (password.length > 20 || password.length < 4) {
        alert("Contraseña debe tener entre 4 y 20 caracteres");
        return;
      }
    }

    const formData = {
      room_name: name,
      players_expected: players,
      owner_name: ownerName,
      password: password || null,
    };
    if (typeof handleCreateRoom === "function" && formData.name !== "") {
      handleCreateRoom(formData);
    }
  };

  function clickplay() {
    new Audio(clicksound).play();
  }

  function enterplay() {
    new Audio(entersound).play();
  }

  return (
    <div className="mx-auto pt-16 flex max-w-screen-lg flex-col items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md items-center justify-center rounded-lg bg-[#2f4550] bg-opacity-90 p-6 shadow-lg text-white">
        <ModalInput
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClickAceptar={setOwnerName}
          handleClickCancelar={handleLeave}
          title="Nombre para partida"
          desc="Escriba el nombre con el cual quiera ser identificado la partida"
          has_password={false}
        />
        <h1 className="mb-8 mt-4 text-center font-serif text-4xl font-bold text-[#e8e5da]">
          Crear Sala
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#3c5761] p-4 rounded-lg shadow-lg">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#e8e5da]">
              Nombre de la sala
            </label>
            <input
              onChange={handleRoomName}
              id="name"
              type="text"
              className="mt-1 block w-full bg-cyan-50 p-3 border border-gray-600 rounded-lg shadow-sm text-black focus:ring-emerald-200 focus:border-emerald-100 sm:text-sm"
              value={name}
            />
          </div>
          <div>
            <label htmlFor="playerCount" className="block text-sm font-medium text-[#e8e5da]">
              Cantidad de jugadores
            </label>
            <input
              onChange={handlePlayerCount}
              id="playerCount"
              type="number"
              min={2}
              max={4}
              value={players}
              className="mt-1 block w-full bg-cyan-50 p-3 border border-gray-600 rounded-lg shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="2-4 jugadores"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#e8e5da]">
              Contraseña
            </label>
            <input
              onChange={handleRoomPassword}
              id="password"
              type="password"
              placeholder="Deja en blanco para sala pública"
              className="mt-1 block w-full bg-cyan-50 p-3 border border-gray-600 rounded-lg shadow-sm text-black focus:ring-emerald-200 focus:border-emerald-100 sm:text-sm"
              value={password}
            />
          </div>
          <ButtonFilled
            type="submit"
            className="w-full mt-4"
            onClick={clickplay}
            onmouseenter={enterplay}
          >
            Crear
          </ButtonFilled>
          <ButtonUnfilled
            onClick={handleLeave}
            onmouseenter={enterplay}
            className="w-full mt-2"
          >
            Salir
          </ButtonUnfilled>
        </form>
      </div>
    </div>
  );
}
