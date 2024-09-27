import { useState } from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../../services/state";
import RoomDialog from "./RoomDialog.jsx";

//FOR DEBUG : MAX, MIN and PLAYERS array, should not exist in final build.
//these values should be provided by the user/server and or be fixxed.
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;

export default function CreateRoomLayout({ onSubmit }) {
  const userId = useIdStore((state) => state.userId);
  if (!userId) {
    navigate("/");
  }
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate(`/id/${userId}`);
  };

  const [name, setName] = useState("");
  const [players, setPlayers] = useState(2);
  const [isOpen, setIsOpen] = useState(true);
  const [ownerName, setOwnerName] = useState('');

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
    event.preventDefault();
    const formData = {
      room_name: name,
      players_expected: players,
      owner_name: ownerName,
    };

    if (typeof onSubmit === "function" && formData.name !== "") {
      // Como me mareaste nico jajaja
      onSubmit(formData);
    } else if (formData.name === "") {
      alert("Empty name");
    }
  };

  return (
    <div className="mx-auto mt-10 flex max-w-screen-lg flex-col items-center justify-center p-4">
      <div className="center mx-auto w-full max-w-md items-center justify-center bg-lime-200 p-4 shadow-md">
        <RoomDialog isOpen={isOpen} onClose={setIsOpen} onOwnerName={setOwnerName}></RoomDialog>
        <h1 className="mb-8 mt-4 text-center font-serif text-4xl font-bold">
          Create Room
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-lime-100 p-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Room Name
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
              Player Count
            </label>
            <input
              onChange={handlePlayerCount}
              id="playerCount"
              type="number"
              min={MIN_PLAYERS}
              max={MAX_PLAYERS}
              value={players}
              className="mt-1 block w-full border-gray-600 bg-cyan-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="2-4 players"
            />
          </div>
          <Button
            type="submit"
            className="mb-2 me-2 w-full border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
          >
            Create Room
          </Button>
          <Button
            type="button"
            onClick={handleLeave}
            className="mb-2 me-2 w-full border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
          >
            Leave
          </Button>
        </form>
      </div>
    </div>
  );
}
