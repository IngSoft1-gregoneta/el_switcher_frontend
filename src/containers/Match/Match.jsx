import { useBoardStore, useIdStore, useWinnerStore, useTestStore } from "../../zustand/store.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";
import MatchLayout from "./components/MatchLayout.jsx";
import { passTurn, leaveMatch } from "./services/MatchService.js";
import { useEffect } from "react";
import BoardClass from "./logic/board.js";

export default function Match() {
  const setStateWinner = useWinnerStore((state) => state.setStateWinner);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const { room_id, user_name, user_id } = useParams();
  const navigate = useNavigate();
  // Volver a const.
  let { stateBoard, statePlayerMe, stateOtherPlayers, error } = useMatchData(
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
  // Estados de testeo, temporales.
  // los uso ahora porque no existen los endpoints para manejar los movimientos, los cuales deberian
  // alterar el estado mandar un broadcast y asi el cliente traer los cambios nuevos.
  const testMe = useTestStore((state) => state.testMe);
  const testOthers = useTestStore((state) => state.testOthers);
  const setTestMe = useTestStore((state) => state.setTestMe);
  const setTestOthers = useTestStore((state) => state.setTestOthers);

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

  // TODO : manejar movimientos.
  // const handlePartialMove = async () => {};
  // const handleUndoPartialMove = async () => {};
  // const handleConfirmMoves = async () => {};

  useEffect(()=>{
    // podes clickear cualquier tile pero solo tiene efecto si es el turno del jugador.
    // es necesario checkear que statePlayerMe no sea null, ya que al renderizar el componente el hook se llama
    // antes de que useMatchData retorne algo.
    if(statePlayerMe?.has_turn){
      if(firstPos && secondPos){
        let old_board = board;
        const new_board = old_board.switchTiles(firstPos, secondPos);
        setBoard(new_board);
        setTestMe(statePlayerMe);
        setTestOthers(stateOtherPlayers);
        console.log(firstPos, secondPos);
        setFirstPos(null);
        setSecondPos(null);
      }
    } else {
      setFirstPos(null);
      setSecondPos(null);
    }
  },[firstPos,secondPos,board,setBoard,statePlayerMe,stateOtherPlayers]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if(!(testMe && testOthers)){
    console.log("we are not good");
  }

  // THIS is also for testing, and should be removed
  if(testMe && testOthers && board){
    console.log("we are good");
    return (
      <MatchLayout
      statePlayerMe={testMe}
      stateOtherPlayers={testOthers}
      handleLeaveMatch={handleLeaveMatch}
      handlePassTurn={handlePassTurn}
    />
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
      handleLeaveMatch={handleLeaveMatch}
      handlePassTurn={handlePassTurn}
    />
  );
}
