import { createContext, useContext, useState } from "react";

const RoomContext = createContext({});

export function useRoom() {
  return useContext(RoomContext);
}

export function RoomProvider({ children }) {
  const [RoomData, setRoomData] = useState(null);

  return (
    <RoomContext.Provider value={{ RoomData, setRoomData }}>
      {children}
    </RoomContext.Provider>
  );
}