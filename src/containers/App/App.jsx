import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Lobby from "../Lobby/Lobby.jsx";
import { LobbyProvider } from "../Lobby/context/LobbyContext.jsx";
import LobbyLayout from "../Lobby/components/LobbyLayout.jsx";
import FailedLobby from "../Lobby/components/FailedLobby.jsx";

export default function App() {
  const [games, setGames] = useState(null);

  function fetchGames() {
    fetch("http://127.0.0.1:8000/list_games", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  let gamesList;
  if (games != null) {
    gamesList = games.map((game) => (
      <li
        key={game.id}
        className="m-2 border-2 border-dashed border-cyan-700 p-4"
      >
        {game.name}
      </li>
    ));
  }

  return (
    <LobbyProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                gamesList={gamesList}
                fetchGames={fetchGames}
                createLobby={() => <Lobby />}
              />
            }
          ></Route>
          <Route path="/CreateLobby" element={<Lobby />} />
          <Route path="/Lobby" element={<LobbyLayout />} />
          <Route path="/FailedLobby" element={<FailedLobby />}/>
        </Routes>
      </BrowserRouter>
    </LobbyProvider>
  );
}
