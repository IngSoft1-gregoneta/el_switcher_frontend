import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import RoomConfig from "../Room/Room.jsx";
import { RoomProvider, useRoom } from "../Room/context/RoomContext.jsx";
import RoomLayout from "../Room/components/RoomLayout.jsx";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import RoomCreationFailed from "../Room/components/FailedRoom.jsx";
import NotFoundPageLayout from "../../components/NotFoundPageLayout.jsx";
import { create } from "zustand";

export const useIdStore = create((set) => ({
  userId: null,
  setId: (newId) => set({ userId: newId }),
}));

export default function App() {
  const [socketUrl, setSocketUrl] = useState(null);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const userId = useIdStore((state) => state.userId);
  const setId = useIdStore((state) => state.setId);
  console.log("id", userId);

  // Creo que esto corre dos veces, pero no se porque
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_id", {
          method: "GET",
        });
        if (response.ok) {
          const id = await response.json();
          console.log(id);
          setId(id);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUserId();
  }, [setId]);

  useEffect(() => {
    if (userId) {
      setSocketUrl(`ws://localhost:8000/ws/${userId}`);
    }
  }, [setSocketUrl, userId]);

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
          <Route
            // action={() => setSocketUrl(null)}
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
