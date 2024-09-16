import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Lobby from "../Lobby/Lobby.jsx";
import { LobbyProvider } from "../Lobby/context/LobbyContext.jsx";
import LobbyLayout from "../Lobby/components/LobbyLayout.jsx";
import FailedLobby from "../Lobby/components/FailedLobby.jsx";
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

  //TODO: El id del juego lo deberia dar el server, unir alguna manera el de usuario con partida
  //Que el id de la partida simbolice un websocket para esa partida
  function addGame() {
    if (userId !== null) {
      console.log(userId);
      fetch("http://127.0.0.1:8000/add_game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, name: gameName }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  function handleInputChange(e) {
    setGameName(e.target.value);
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
  let msg = "nada"
  if (lastMessage !== null) {
    msg = lastMessage.data
  }

  return (
    <LobbyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
            {msg}
            <AppLayout
              lastMessage={lastMessage}
              handleInputChange={handleInputChange}
              createLobby={() => <Lobby />}
            />
          </div>
          }/>
          <Route path="/CreateLobby" element={<Lobby />} />
          <Route path="/Lobby" element={<LobbyLayout />} />
          <Route path="/FailedLobby" element={<FailedLobby />}/>
        </Routes>
      </BrowserRouter>
    </LobbyProvider>
  );
}
