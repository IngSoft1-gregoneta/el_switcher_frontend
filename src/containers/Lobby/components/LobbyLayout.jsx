import React from "react";
import { useLobby } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";

export default function LobbyLayout() {
  const navigate = useNavigate();
  const { lobbyData } = useLobby();

  //TODO : handle destroying lobby on server when owner leaves/lobby is empty.
  //TODO : kick players out of lobby if lobby owner leaves.
  const handleLeave = () =>{
    navigate('/');
  }

  //TODO : handle game validations before routing to /Game
  //TODO : connect to server and create a game instance
  const handleStartGame = () =>{
    navigate('/Game');
  }

  //TODO : handle waiting for lobby.
  if (!lobbyData) {
    return <div>Loading...</div>;
  }
 
  const { name, players, expected_players } = lobbyData;

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold">Lobby</h1>
      <div className="mb-4 border-b pb-4">
        <h2 className="text-xl font-semibold">Lobby Name: {name}</h2>
        <span className="block text-gray-600">
          Expected Players: {expected_players}
        </span>
      </div>
      <div>
        <h4 className="mb-4 text-lg font-medium">Players in Lobby</h4>
        <ul className="list-disc pl-5">
          {players.map((player, index) => (
            <li key={index} className="mb-2 text-gray-800">
              {player}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          type="button"
          onClick={handleLeave}
          className="w-full m-4 rounded-md bg-sky-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Leave Lobby
        </Button>
        <Button
          type="button"
          onClick={handleStartGame}
          className="w-full m-4 rounded-md bg-sky-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}
