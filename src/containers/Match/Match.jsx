import { useBoardStore, useIdStore } from "../../zustand/store.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";
import MatchLayout from "./components/MatchLayout.jsx";
import { passTurn, leaveMatch, makePartialMove } from "./services/MatchService.js";
import { useEffect } from "react";
import { useMovCardStore } from "../../zustand/store.js";
import { useBoardInit } from "./hooks/useBoardInit.jsx";
import { useMoveHighLights } from "./hooks/useMoveHighLights.jsx";

export default function Match() {
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const { room_id, user_name, user_id } = useParams();
  const navigate = useNavigate();
  const { stateBoard, statePlayerMe, stateOtherPlayers, stateWinner, usedMovCards, error } =
    useMatchData(room_id, user_name);
  if (!userId) setUserId(user_id);
  const firstPos = useBoardStore((state) => state.firstPos);
  const secondPos = useBoardStore((state) => state.secondPos);
  const setFirstPos = useBoardStore((state) => state.setFirstPos);
  const setSecondPos = useBoardStore((state) => state.setSecondPos);
  const board = useBoardStore((state) => state.board);
  const setBoard = useBoardStore((state) => state.setBoard);
  
  const setHighlightedTiles = useBoardStore((state) => state.setHighlightedTiles);

  const selectedMovCard = useMovCardStore((state) => state.selectedMovCard);
  const setSelectedMovCard = useMovCardStore((state) => state.setSelectedMovCard);

  const resetMoveState = () => {
    setFirstPos(null);
    setSecondPos(null);
    setSelectedMovCard(null);
    setHighlightedTiles(null);
  };

  const handlePassTurn = async () => {
    try {
      await passTurn(room_id, user_name);
      resetMoveState();
    } catch (error) {
      resetMoveState();
      console.error(error);
    }
  };

  const handleLeaveMatch = async () => {
    try {
      await leaveMatch(room_id, user_name, user_id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePartialMove = async (roomID,playerName,cardIndex,x1,y1,x2,y2) => {
    try{
      await makePartialMove(roomID,playerName,cardIndex,x1,y1,x2,y2);
      resetMoveState();
    } catch(error){
      resetMoveState();
      // TODO avisar que no se pudo hacer el movimiento?
      console.log(error);
    }
  };

  useBoardInit(stateBoard,setBoard);

  useMoveHighLights(selectedMovCard, board, firstPos, statePlayerMe, setHighlightedTiles);

  useEffect(()=>{
    if(statePlayerMe?.has_turn && selectedMovCard != null){
      if(firstPos && secondPos){
        handlePartialMove(
          room_id,
          user_name,
          selectedMovCard.index,
          firstPos.pos_x,
          firstPos.pos_y,
          secondPos.pos_x,
          secondPos.pos_y
        );
        resetMoveState();
      }
    } else {
      resetMoveState();
    }
  },[firstPos,secondPos,statePlayerMe,selectedMovCard]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }
  
  if (stateWinner != null) {
    return < Winner/>
}
  if (!statePlayerMe || !stateOtherPlayers || !board) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }


  return (
    <MatchLayout
      statePlayerMe={statePlayerMe}
      stateOtherPlayers={stateOtherPlayers}
      usedMovCards={usedMovCards}
      handleLeaveMatch={handleLeaveMatch}
      handlePassTurn={handlePassTurn}
    />
  );
}
