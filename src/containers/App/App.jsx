import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import CreateRoom from "../CreateRoom/CreateRoom.jsx";
import { RoomProvider } from "../Room/context/RoomContext.jsx";
import RoomCreationFailed from "../Room/components/FailedRoom.jsx";
import NotFoundPageLayout from "../../components/NotFoundPageLayout.jsx";
import GetId from "./GetId.jsx";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  useUpdateStore,
  useIdStore,
  useMatchStore,
  useTimerStore,
} from "../../zustand/store.js";
import Match from "../Match/Match.jsx";
import Room from "../Room/Room.jsx";
import "./styles/background.css";

export default function App() {
  const [socketUrl, setSocketUrl] = useState(null);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const userId = useIdStore((state) => state.userId);
  const setUpdateList = useUpdateStore((state) => state.setUpdateList);
  const setUpdateRoom = useUpdateStore((state) => state.setUpdateRoom);
  const setUpdateMatch = useUpdateStore((state) => state.setUpdateMatch);
  const setMatchStarted = useMatchStore((state) => state.setMatchStarted);
  const setTimerMessage = useTimerStore((state) => state.setTimerMessage);
  const matchStarted = useMatchStore((state) => state.matchStarted);

  useEffect(() => {
    if (userId) {
      setSocketUrl(`ws://localhost:8000/ws/${userId}`, {
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

  console.log("connectionStatus ", connectionStatus);
  useEffect(() => {
    if (lastMessage) {
      console.log("Este es lastmessage " + lastMessage.data);
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
      if (lastMessage.data.startsWith("2024")) {
        // Detecta mensajes del timer
        const timerValue = lastMessage.data; // En 2025 deja de  funcionar JAJA
        setTimerMessage(timerValue); // TODO: Arreglar
        console.log("WS: ", timerValue);
      }
    }
  }, [
    setMatchStarted,
    setUpdateMatch,
    lastMessage,
    setUpdateRoom,
    setUpdateList,
    setTimerMessage,
  ]);

  return (
    <RoomProvider>
      {/* Background Container */}
      <div className="fixed left-0 top-0 z-[-1] h-full w-full overflow-hidden">
        {/* Background Color Gradient */}
        <div className="absolute top-0 z-[-1] h-full w-full bg-gradient-to-t from-[#00b4ff] to-[#10347c]" />
        {/* Nubes */}
        <div
          id="background-wrap"
          className="absolute left-0 top-0 h-full w-full overflow-hidden"
        >
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>
      </div>
      {/* Contenido */}
      <div className="min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetId />} />
            <Route path="/id/:user_id" element={<AppLayout />} />
            <Route path="/create_room" element={<CreateRoom />} />
            <Route
              path="/room/:user_id/:room_id/:user_name"
              element={<Room />}
            />
            <Route path="/failed_room" element={<RoomCreationFailed />} />
            <Route
              path="/match/:user_id/:room_id/:user_name"
              element={<Match />}
            />
            <Route path="*" element={<NotFoundPageLayout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RoomProvider>
  );
}
