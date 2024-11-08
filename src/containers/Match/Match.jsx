import {
  useBoardStore,
  useIdStore,
  useMatchStore,
} from "../../zustand/store.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";
import MatchLayout from "./components/MatchLayout.jsx";
import {
  passTurn,
  leaveMatch,
  makePartialMove,
  undoPartialMove,
  discardFigure,
} from "./services/MatchService.js";
import { useEffect, useReducer, useRef } from "react";
import { useMovCardStore } from "../../zustand/store.js";
import { useBoardInit } from "./hooks/useBoardInit.jsx";
import { useMoveHighLights } from "./hooks/useMoveHighLights.jsx";
import Chat from "./components/Chat.jsx";

//TODO: a services?
const selectFigCardReducer = (state, action) => {
  if (action.type === "select_fig_card") {
    console.log(state);
    if (!state.index && !state.player)
      return { index: action.index, player: action.player };
    if (state.index === action.index && state.player === action.player)
      return { index: null, player: null };
    return { index: action.index, player: action.player };
  }
  if (action.type === "deselect") {
    return { index: null, player: null };
  }
  throw Error("Unknown action: " + action.type);
};

export default function Match() {
  const setMatchStarted = useMatchStore((state) => state.setMatchStarted);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const firstPos = useBoardStore((state) => state.firstPos);
  const secondPos = useBoardStore((state) => state.secondPos);
  const setFirstPos = useBoardStore((state) => state.setFirstPos);
  const setSecondPos = useBoardStore((state) => state.setSecondPos);
  const board = useBoardStore((state) => state.board);
  const setBoard = useBoardStore((state) => state.setBoard);
  const setHighlightedTiles = useBoardStore(
    (state) => state.setHighlightedTiles,
  );
  const selectedMovCard = useMovCardStore((state) => state.selectedMovCard);
  const setSelectedMovCard = useMovCardStore(
    (state) => state.setSelectedMovCard,
  );
  const { room_id, user_name, user_id } = useParams();
  const navigate = useNavigate();
  const {
    stateBoard,
    statePlayerMe,
    stateOtherPlayers,
    stateWinner,
    usedMovCards,
    error,
  } = useMatchData(room_id, user_name);

  const [selectedFigCards, dispatchFigCards] = useReducer(
    selectFigCardReducer,
    { selectedFigCard: null, player: null },
  );

  const resetMoveStateRef = useRef(() => {
    setFirstPos(null);
    setSecondPos(null);
    setSelectedMovCard(null);
    setHighlightedTiles(null);
  });

  if (!userId) setUserId(user_id);

  const handleDiscardFigure = async (tile) => {
    if (selectedFigCards.player && selectedFigCards.index !== null) {
      try {
        await discardFigure(
          room_id,
          selectedFigCards.player,
          selectedFigCards.index,
          tile.x,
          tile.y,
        );
        dispatchFigCards({ type: "deselect" });
        console.log("discarded?");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePassTurn = async () => {
    try {
      await passTurn(room_id, user_name);
      resetMoveStateRef.current();
    } catch (error) {
      resetMoveStateRef.current();
      console.error(error);
    }
  };

  const handleLeaveMatch = async () => {
    try {
      await leaveMatch(room_id, user_name, user_id);
      setMatchStarted(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handlePartialMove = async (
    roomID,
    playerName,
    cardIndex,
    x1,
    y1,
    x2,
    y2,
  ) => {
    try {
      await makePartialMove(roomID, playerName, cardIndex, x1, y1, x2, y2);
      resetMoveStateRef.current();
    } catch (error) {
      resetMoveStateRef.current();
      // TODO avisar que no se pudo hacer el movimiento?
      console.log(error);
    }
  };

  const handleRevertMove = async () => {
    try {
      await undoPartialMove(room_id, user_name);
    } catch (error) {
      console.log(error);
    }
  };

  useBoardInit(stateBoard, setBoard);

  useMoveHighLights(
    selectedMovCard,
    board,
    firstPos,
    statePlayerMe,
    setHighlightedTiles,
  );

  useEffect(() => {
    if (statePlayerMe?.has_turn && selectedMovCard != null) {
      if (firstPos && secondPos) {
        handlePartialMove(
          room_id,
          user_name,
          selectedMovCard.index,
          firstPos.pos_x,
          firstPos.pos_y,
          secondPos.pos_x,
          secondPos.pos_y,
        );
        resetMoveStateRef.current();
      }
    } else {
      resetMoveStateRef.current();
    }
  }, [
    resetMoveStateRef,
    room_id,
    user_name,
    firstPos,
    secondPos,
    statePlayerMe,
    selectedMovCard,
  ]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (stateWinner != null) {
    return <Winner winner={stateWinner} />;
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
      selectedFigReducer={{
        selectedFigCards: selectedFigCards,
        dispatchFigCards: dispatchFigCards,
      }}
      handleLeaveMatch={handleLeaveMatch}
      handlePassTurn={handlePassTurn}
      handleDiscardFigure={handleDiscardFigure}
      handlePartialMove={handlePartialMove}
      handleRevertMove={handleRevertMove}
      >
      <Chat userId={user_id} />
    </MatchLayout>
  );
}
