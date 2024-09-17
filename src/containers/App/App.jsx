import AppLayout from "./components/AppLayout.jsx";
import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

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

  return <AppLayout lastMessage={lastMessage} />;
}
