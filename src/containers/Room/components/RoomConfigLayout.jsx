import React, { useState } from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

//FOR DEBUG : MAX, MIN and PLAYERS array, should not exist in final build.
//these values should be provided by the user/server and or be fixxed.
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;

export default function LobbyConfigLayout({ onSubmit }) {
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/");
  };

  const [name, setName] = useState("");
  const [players, setPlayers] = useState(2);

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
      owner_name: "nico",
    };

    if (typeof onSubmit === "function" && formData.name !== "") {
      onSubmit(formData);
    } else if (formData.name === "") {
    }
  };

  return (
    <div className="mx-auto max-w-md items-center justify-center rounded-lg bg-white p-4 shadow-md">
      <h1 className="mb-8 text-center text-4xl font-bold">Create Lobby</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Lobby Name
          </label>
          <input
            onChange={handleRoomName}
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={name}
          />
        </div>
        <div>
          <label
            htmlFor="playerCount"
            className="block text-sm font-medium text-gray-700"
          >
            Player Count
          </label>
          <input
            onChange={handlePlayerCount}
            id="playerCount"
            type="number"
            min={MIN_PLAYERS}
            max={MAX_PLAYERS}
            value={players}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="2-4 players"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md bg-sky-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Room
        </Button>
        <Button
          
          type="button"
          onClick={handleLeave}
          className="w-full rounded-md bg-sky-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Leave
        </Button>
      </form>
    </div>
  );
}
