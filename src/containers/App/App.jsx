import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import CreateRoom from "../Room/CreateRoom.jsx";
import { RoomProvider } from "../Room/context/RoomContext.jsx";
import RoomLayout from "../Room/components/RoomLayout.jsx";
import RoomCreationFailed from "../Room/components/FailedRoom.jsx";
import NotFoundPageLayout from "../../components/NotFoundPageLayout.jsx";
import GetId from "./GetId.jsx";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useUpdateStore, useIdStore } from "../../services/state.js";

export default function App() {
  const [socketUrl, setSocketUrl] = useState(null);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const userId = useIdStore((state) => state.userId);
  const setUpdateList = useUpdateStore((state) => state.setUpdateList);
  const setStateRoom = useUpdateStore((state) => state.setStateRoom);

  // El socketUrl debe estar en el tope de la app si no se desconecta
  useEffect(() => {
    if (userId) {
      setSocketUrl(`ws://localhost:8000/ws/${userId}`);
    }
  }, [setSocketUrl, userId]);
  console.log(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (connectionStatus == ReadyState.CLOSED) {
      setSocketUrl(null);
    }
  }, [setSocketUrl, connectionStatus]);

  console.log(connectionStatus);
  console.log(lastMessage);
  useEffect(() => {
    if (lastMessage) {
      // Estos podrian ser ENUMS?
      if (lastMessage.data === "LISTA") {
        setUpdateList();
      }
      if (lastMessage.data == "ROOM") {
        setStateRoom("CHANGE");
      }
      if (lastMessage.data == "DELETE_ROOM") {
        setStateRoom("DELETED");
      }
    }
  }, [lastMessage, setStateRoom, setUpdateList]);

  return (
    <RoomProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetId />} />
          <Route path="/id/:user_id" element={<AppLayout />} />
          <Route path="/create_room" element={<CreateRoom />} />
          <Route
            path="/room/:room_id/:user_name/:user_id"
            element={<RoomLayout />}
          />
          <Route path="/failed_room" element={<RoomCreationFailed />} />
          <Route path="*" element={<NotFoundPageLayout />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}
