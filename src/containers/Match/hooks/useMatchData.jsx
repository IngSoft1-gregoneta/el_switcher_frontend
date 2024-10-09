import { useEffect, useState } from "react";
import { fetchMatch } from "../services/MatchService";
import { useUpdateStore } from "../../../zustand/store";
import { useBoardStore } from "../../../zustand/store";

const useMatchData = (roomId, userName) => {
  const [stateBoard, setStateBoard] = useState(null);
  const [statePlayerMe, setStatePlayerMe] = useState(null);
  const [stateOtherPlayers, setStateOtherPlayers] = useState(null);
  const [error, setError] = useState(null);

  const updateMatch = useUpdateStore((state) => state.updateMatch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatch(roomId, userName);
        console.log(matchData);
        setStateBoard(matchData.board.tiles);
        setStatePlayerMe(matchData.me);
        setStateOtherPlayers(matchData.other_players);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, [
    userName,
    roomId,
    updateMatch,
  ]);

  return { stateBoard, statePlayerMe, stateOtherPlayers, error };
};

export default useMatchData;
