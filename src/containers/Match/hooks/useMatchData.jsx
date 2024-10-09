import { useEffect, useState } from "react";
import { fetchMatch } from "../services/MatchService";
import { useUpdateStore } from "../../../zustand/store";
import { useBoardStore } from "../../../zustand/store";
import BoardClass from "../logic/board";

const useMatchData = (roomId, userName) => {
  const [stateBoard, setStateBoard] = useState(null);
  const [statePlayerMe, setStatePlayerMe] = useState(null);
  const [stateOtherPlayers, setStateOtherPlayers] = useState(null);

  const updateMatch = useUpdateStore((state) => state.updateMatch);
  const setBoard = useBoardStore((state) => state.setBoard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatch(roomId, userName);
        console.log(matchData);
        setStateBoard(matchData.board.tiles);// Estas dos cosas estan tratando de hacer basicamente lo mismo
        setBoard(new BoardClass(matchData.board.tiles));     // una va a match container, la otra va a boardStore. 
        setStatePlayerMe(matchData.me);
        setStateOtherPlayers(matchData.other_players);
        // TODO: hacer esto por id :SSSS
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [
    setStatePlayerMe,
    setStateOtherPlayers,
    userName,
    roomId,
    setStateBoard,
    setBoard,
    updateMatch, // este hace q se actualice con ws
  ]);

  return { stateBoard, statePlayerMe, stateOtherPlayers };
};

export default useMatchData;
