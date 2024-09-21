import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import RoomConfig from "../Room/Room.jsx";
import { RoomProvider, useRoom } from "../Room/context/RoomContext.jsx";
import RoomLayout from "../Room/components/RoomLayout.jsx";
import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import RoomCreationFailed from "../Room/components/FailedRoom.jsx";
import NotFoundPageLayout from "../../components/NotFoundPageLayout.jsx";

export default function App() {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
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
          <Route path="/" element={<AppLayout lastMessage={lastMessage} />} />
          <Route path="/create_room" element={<RoomConfig />} />
          <Route path="/room/:room_id/:user_name" element={<RoomLayout />} />
          <Route path="/failed_room" element={<RoomCreationFailed />} />
          <Route path="*" element={<NotFoundPageLayout />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}
