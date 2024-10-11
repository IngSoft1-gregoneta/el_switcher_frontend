import { useBoardStore, useIdStore, useWinnerStore } from "../../zustand/store.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";
import MatchLayout from "./components/MatchLayout.jsx";
import { passTurn, leaveMatch, makePartialMove } from "./services/MatchService.js";
import { useEffect } from "react";
import BoardClass from "./logic/board.js";
import { useMovCardStore } from "../../zustand/store.js";

export default function Match() {
  const setStateWinner = useWinnerStore((state) => state.setStateWinner);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const { room_id, user_name, user_id } = useParams();
  const navigate = useNavigate();
  const { stateBoard, statePlayerMe, stateOtherPlayers, error, usedMovCards } =
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

  const handlePassTurn = async () => {
    try {
      const response = await passTurn(room_id, user_name);
      console.log(response);
    } catch (error) {
      console.error(error);
      console.log("No es el turno de este jugador.");
    }
  };

  const handleLeaveMatch = async () => {
    try {
      const response = await leaveMatch(room_id, user_name, user_id);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (stateBoard) {
      const newBoard = new BoardClass(stateBoard);
      setBoard(newBoard);
    }
  }, [stateBoard, setBoard]);

  useEffect(() => {
    if (selectedMovCard && firstPos && board) {
      console.log(selectedMovCard.mov_type);
      const highlited_tiles = board.higlightTiles(firstPos, selectedMovCard.mov_type);
      setHighlightedTiles(highlited_tiles);
    }
  }, [selectedMovCard, board, firstPos]);

  // TODO : manejar movimientos.
  const handlePartialMove = async (roomID,x1,y1,x2,y2) => {
    try{
      await makePartialMove(roomID,x1,y1,x2,y2);
      setHighlightedTiles(null);
    } catch(error){
      console.log(error);
    }
  };
  // const handleUndoPartialMove = async () => {};
  // const handleConfirmMoves = async () => {};

  useEffect(()=>{
    if(statePlayerMe?.has_turn && selectedMovCard != null){
      if(firstPos && secondPos){
        handlePartialMove(
          room_id,
          firstPos.pos_x,
          firstPos.pos_y,
          secondPos.pos_x,
          secondPos.pos_y
        );
        setFirstPos(null);
        setSecondPos(null);
        setSelectedMovCard(null);
      }
    } else {
      setFirstPos(null);
      setSecondPos(null);
    }
  },[firstPos,secondPos,statePlayerMe,selectedMovCard]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!statePlayerMe || !stateOtherPlayers || !board) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (stateOtherPlayers && stateOtherPlayers[0] === undefined) {
    setStateWinner(user_name);
    return <Winner />;
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
