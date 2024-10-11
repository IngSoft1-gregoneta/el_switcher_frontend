import { useEffect, useState } from "react";
import { fetchMatch } from "../services/MatchService";
import { useUpdateStore } from "../../../zustand/store";

const useMatchData = (roomId, userName) => {
  const [stateBoard, setStateBoard] = useState(null);
  const [statePlayerMe, setStatePlayerMe] = useState(null);
  const [stateOtherPlayers, setStateOtherPlayers] = useState(null);
  const [usedMovCards, setUsedMovCards] = useState([]);
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
        setUsedMovCards(matchData.visible_mov_cards);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, [
    setUsedMovCards,
    setStatePlayerMe,
    setStateOtherPlayers,
    userName,
    roomId,
    updateMatch,
  ]);

  return { stateBoard, statePlayerMe, stateOtherPlayers, usedMovCards, error };
};

export default useMatchData;