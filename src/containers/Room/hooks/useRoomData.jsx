import { useEffect, useState } from "react";
import { useUpdateStore, useIdStore } from "../../../zustand/store.js";
import { useNavigate } from "react-router-dom";

const useRoomData = (roomId, userName) => {
  const [roomData, setRoomData] = useState(null);
  const updateRoom = useUpdateStore((state) => state.updateRoom);
  const userId = useIdStore((state) => state.userId);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoom() {
      console.log("Esta es la roomId", roomId);
      if (roomId) {
        try {
          const resp = await fetch(
            `http://127.0.0.1:8000/room/${encodeURIComponent(roomId)}`,
            {
              method: "GET",
            },
          );
          if (!resp.ok) {
            if (resp.status === 404) throw new Error("404, Not found");
            if (resp.status === 500)
              throw new Error("500, internal server error");
          }

          const data = await resp.json();
          if ("room_id" in data) {
            setRoomData(data);
            setIsOwner(data.owner_name == userName);
          }
        } catch (error) {
          console.error("Fetch", error);
          navigate(`/id/${userId}`);
        }
      }
    }
    fetchRoom();
  }, [roomId, updateRoom, userId, userName, navigate, setIsOwner]);

  return { roomData, isOwner };
};
export default useRoomData;
