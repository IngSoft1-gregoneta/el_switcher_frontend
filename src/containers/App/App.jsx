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
import {
  useUpdateStore,
  useIdStore,
  useMatchStore,
} from "../../services/state.js";
import Match from "../Match/Match.jsx";

export default function App() {
  const [socketUrl, setSocketUrl] = useState(null);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const userId = useIdStore((state) => state.userId);
  const setUpdateList = useUpdateStore((state) => state.setUpdateList);
  const setUpdateRoom = useUpdateStore((state) => state.setUpdateRoom);
  const setUpdateMatch = useMatchStore((state) => state.setUpdateMatch);
  const setMatchStarted = useMatchStore((state) => state.setMatchStarted);

  // El socketUrl debe estar en el tope de la app si no se desconecta
  useEffect(() => {
    if (userId) {
      setSocketUrl(`ws://localhost:8000/ws/${userId}`, {
        // onClose: () => console.log("HOLAAA"),
        shouldReconnect: (closeEvent) => true,
        reconnectAttempts: 100,
        reconnectInterval: (attemptNumber) =>
          Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
      });
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

  console.log(connectionStatus);
  useEffect(() => {
    if (lastMessage) {
      console.log("Este es lastmessage " + lastMessage.data);
      // Estos podrian ser ENUMS?
      // No existen los ENUMS, la mejor opcion es un objeto inmutable(object.freeze({...}))
      if (lastMessage.data === "LISTA") {
        setUpdateList();
      }
      if (lastMessage.data == "ROOM") {
        setUpdateRoom();
      }
      if (lastMessage.data == "MATCH") {
        setMatchStarted(true);
        setUpdateMatch();
      }
    }
  }, [
    setMatchStarted,
    setUpdateMatch,
    lastMessage,
    setUpdateRoom,
    setUpdateList,
  ]);
  return (
    <RoomProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetId />} />
          <Route path="/id/:user_id" element={<AppLayout />} />
          <Route path="/create_room" element={<CreateRoom />} />
          <Route
            path="/room/:user_id/:room_id/:user_name"
            element={<RoomLayout />}
          />
          <Route path="/failed_room" element={<RoomCreationFailed />} />
          <Route
            path="/match/:user_id/:room_id/:user_name"
            element={<Match />}
          />
          <Route path="*" element={<NotFoundPageLayout />} />
        </Routes>
      </BrowserRouter>
    </RoomProvider>
  );
}
