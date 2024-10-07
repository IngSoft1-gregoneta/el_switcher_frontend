import { useIdStore, useWinnerStore } from "../../zustand/store.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";
import MatchLayout from "./components/MatchLayout.jsx";
import { passTurn, leaveMatch } from "./services/MatchService.js";

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
        stateBoard={stateBoard}
        handleLeaveMatch={handleLeaveMatch}
        handlePassTurn={handlePassTurn}
      />
    );
  }
}
