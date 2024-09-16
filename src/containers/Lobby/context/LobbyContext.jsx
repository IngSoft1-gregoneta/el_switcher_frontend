import { createContext, useContext, useState } from "react";

const LobbyContext = createContext({});

export function useLobby() {
  return useContext(LobbyContext);
}

export function LobbyProvider({ children }) {
  const [lobbyData, setLobbyData] = useState(null);

  return (
    <LobbyContext.Provider value={{ lobbyData, setLobbyData }}>
      {children}
    </LobbyContext.Provider>
  );
}