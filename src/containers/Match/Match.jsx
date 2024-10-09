import { useBoardStore, useIdStore, useWinnerStore} from "../../zustand/store.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";
import MatchLayout from "./components/MatchLayout.jsx";
import { passTurn, leaveMatch } from "./services/MatchService.js";
import { useEffect } from "react";

export default function Match() {
  const setStateWinner = useWinnerStore((state) => state.setStateWinner);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const { room_id, user_name, user_id } = useParams();
  const navigate = useNavigate();
  const { stateBoard, statePlayerMe, stateOtherPlayers } = useMatchData(
    room_id,
    user_name,
  );
  if (!userId) setUserId(user_id);
  const firstPos = useBoardStore((state) => state.firstPos);
  const secondPos = useBoardStore((state) => state.secondPos);
  const setFirstPos = useBoardStore((state) => state.setFirstPos);
  const setSecondPos = useBoardStore((state) => state.setSecondPos);
  const board = useBoardStore((state) => state.board);
  const setBoard = useBoardStore((state) => state.setBoard);

  // console.log("This is the board",board);
  // const boardInstance = new BoardClass(stateBoard);
  // setBoard(boardInstance);

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

  // TODO : manejar movimientos.
  // const handlePartialMove = async () => {};
  // const handleUndoPartialMove = async () => {};
  // const handleConfirmMoves = async () => {};


  useEffect(()=>{
    if(firstPos){
      // console.log(stateBoard);
      console.log("First pos: ", firstPos);
    }
    if(secondPos){
      console.log("Second pos: ", secondPos);
    }
    if(firstPos && secondPos){
      setFirstPos(null);
      setSecondPos(null);
      let new_board = board;
      new_board.switchTiles(firstPos, secondPos);
      setBoard(new_board);
    }
  },[firstPos,secondPos,board,setBoard]);

  if (stateOtherPlayers && stateOtherPlayers[0] == undefined) {
    setStateWinner(user_name);
    return <Winner />;
  } else if (!stateBoard) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <MatchLayout 
        statePlayerMe={statePlayerMe} 
        stateOtherPlayers={stateOtherPlayers} 
        // stateBoard={board}
        handleLeaveMatch={handleLeaveMatch}
        handlePassTurn={handlePassTurn}
      />
    );
  }
}
