import React, { useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";

export default function RoomLayout() {

  const navigate = useNavigate();
  const { RoomData, setRoomData } = useRoom();
  const { room_name = '', players_names = [], expected_players = 0, room_id } = RoomData || {};

  useEffect(() => {
    if (room_id) {
      const websocket = new WebSocket(`ws://localhost:8000/ws/join/${room_id}`);

      websocket.onmessage = function (event) {
        const newPlayer = event.data;
        setRoomData((prevRoomData) => {
          if (!prevRoomData.players_names.includes(newPlayer)) {
            return {
              ...prevRoomData,
              players_names: [...prevRoomData.players_names, newPlayer],
            };
          }
          return prevRoomData;
        });
      };
      return () => websocket.close();
    }
  }, [room_id, setRoomData]);

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
  if (!RoomData) {
    return <div>Loading...</div>;
  }
 
  // const { name, players, expected_players } = RoomData;

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold">Lobby</h1>
      <div className="mb-4 border-b pb-4">
        <h2 className="text-xl font-semibold">Lobby Name: {room_name}</h2>
        <span className="block text-gray-600">
          Expected Players: {expected_players}
        </span>
      </div>
      <div>
        <h4 className="mb-4 text-lg font-medium">Players in Lobby</h4>
        <ul className="list-disc pl-5">
          {players_names.map((player, index) => (
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
