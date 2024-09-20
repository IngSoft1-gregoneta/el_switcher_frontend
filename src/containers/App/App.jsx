import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Room from "../Room/Room.jsx";
import { RoomProvider } from "../Room/context/RoomContext.jsx";
import RoomLayout from "../Room/components/RoomLayout.jsx";
import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import RoomCreationFailed from "../Room/components/FailedRoom.jsx";

export default function App() {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [gameName, setGameName] = useState(null);
  const [userId, setUserId] = useState(null);

  if (userId === null) {
    fetch("http://127.0.0.1:8000/get_id", { method: "GET" })
      .then((response) => response.json())
      .then((id) => {
        setUserId(id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  console.log(connectionStatus);
  console.log(lastMessage);

  return (
    <RoomProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                lastMessage={lastMessage}
                createRoom={() => <Room />}
              />
            }
          />
          <Route path="/CreateRoom" element={<Room />} />
          <Route path="/Room" element={<RoomLayout />} />
          <Route path="/FailedRoom" element={<RoomCreationFailed />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}
