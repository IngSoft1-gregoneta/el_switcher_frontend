import { useEffect, useState } from "react";
import { fetchMatch } from "../services/MatchService";
import { useUpdateStore } from "../../../zustand/store";

const useMatchData = (roomId, userName) => {
  const [stateBoard, setStateBoard] = useState(null);
  const [statePlayerMe, setStatePlayerMe] = useState(null);
  const [stateOtherPlayers, setStateOtherPlayers] = useState(null);
  const [usedMovCards, setUsedMovCards] = useState([]);
  const [error, setError] = useState(null);
  const [stateWinner, setStateWinner] = useState(null);

  const updateMatch = useUpdateStore((state) => state.updateMatch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatch(roomId, userName);
        setStateBoard(matchData.board.tiles);
        setStatePlayerMe(matchData.me);
        setStateOtherPlayers(matchData.other_players);
        setUsedMovCards(matchData.visible_mov_cards);
        if (matchData.winner != null){
          setStateWinner(matchData.winner.player_name);
        } else {
          setStateWinner(null);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [
    setUsedMovCards,
    setStatePlayerMe,
    setStateOtherPlayers,
    setStateWinner,
    userName,
    roomId,
    updateMatch,
  ]);

  return { stateBoard, statePlayerMe, stateOtherPlayers, stateWinner, usedMovCards, error };
};

export default useMatchData;