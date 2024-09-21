import { useEffect, useState } from "react";
import { useRoom } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import { leaveRoom } from "../services/RoomService";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function RoomLayout() {
  const navigate = useNavigate();
  const { RoomData, setRoomData } = useRoom();
  const {
    room_name = "",
    players_names = [],
    expected_players = 0,
    room_id,
  } = RoomData || {};

  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8000/ws/join_room/${encodeURIComponent(room_id)}`,
  );
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  console.log("status ws room " + connectionStatus);
  if (lastMessage !== undefined && lastMessage !== null) {
    console.log("lastMessage room " + lastMessage.data);
  }
  // Maybe we dont need this
  // useEffect(() => {
  //   if (room_id) {
  //     setSocketUrl(
  //       `ws://localhost:8000/ws/join_room/${encodeURIComponent(room_id)}`,
  //     );
  //   }
  // }, [room_id]);
  useEffect(() => {
    if (room_id) {
      fetch(`http://127.0.0.1:8000/room/${encodeURIComponent(room_id)}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => setRoomData(data))
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [room_id, lastMessage, setRoomData]);

  //TODO : handle destroying lobby on server when owner leaves/lobby is empty.
  //TODO : kick players out of lobby if lobby owner leaves.
  //TODO : name?? we need a name somewhere
  //TODO : handle exceptions
  const handleLeave = () => {
    try {
      leaveRoom(room_id, "nico");
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  //TODO : handle game validations before routing to /Game
  //TODO : connect to server and create a game instance
  const handleStartGame = () => {
    navigate("/Game");
  };

  //TODO : handle waiting for lobby.
  if (!RoomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-10 flex max-w-screen-lg flex-col items-center justify-center p-4">
      <div className="center mx-auto w-full max-w-md items-center justify-center bg-lime-200 p-4 shadow-md">
        <h1 className="mb-6 text-center font-serif text-3xl font-bold">Room</h1>
        <div className="mb-4 border-b pb-4">
          <h2 className="text-xl font-semibold">Room Name: {room_name}</h2>
          <span className="block">Expected Players: {expected_players}</span>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-medium">Players in room</h4>
          <ul className="list-disc rounded bg-lime-100 p-4 pl-5">
            {players_names.map((player, index) => (
              <li key={index} className="mb-2">
                {player}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Button
            type="button"
            onClick={handleLeave}
            className="mb-2 me-2 w-full border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
          >
            Leave Room
          </Button>
          <Button
            type="button"
            onClick={handleStartGame}
            className="mb-2 me-2 w-full border border-cyan-700 bg-cyan-700 px-5 py-2.5 text-center text-sm font-semibold text-white data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}
