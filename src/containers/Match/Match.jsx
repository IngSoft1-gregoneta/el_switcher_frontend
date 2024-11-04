import {
  useBoardStore,
  useFigCardStore,
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
  blockFigure,
} from "./services/MatchService.js";
import { useEffect, useReducer } from "react";
import { 
  setPositionReducer, 
  setMovCardReducer, 
  selectFigCardReducer, 
} from "./services/Reducers.js";
import useHighLightTiles from "./hooks/useHighLightTiles.jsx";
import useSetFirstPos from "./hooks/useSetFirstPos.jsx";
import useInitBoard from "./hooks/useInitBoard.jsx";
import useSetSelectedFigCards from "./hooks/useSetSelectedFigCards.jsx";


export default function Match() {
  const setMatchStarted = useMatchStore((state) => state.setMatchStarted);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
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
  const board = useBoardStore( state => state.board);

  // Declare state reducers, initial state.
  const [selectedFigCards, dispatchFigCards] = useReducer(
    selectFigCardReducer,
    { selectedFigCard: null, player: null },
  );
  const [positions, dispatchPositions] = useReducer(
    setPositionReducer,
    { first_position : null, second_position : null },
  );
  const [selectedMovCard, dispatchSelectedMovCard] = useReducer(
    setMovCardReducer,
    { card : null },
  );

  // Set needed gobal state. Data needed by other components
  useSetFirstPos(positions, statePlayerMe);
  useInitBoard(stateBoard);
  useSetSelectedFigCards(selectedFigCards);
  useHighLightTiles(
    positions, 
    selectedMovCard, 
    board, 
    statePlayerMe
  );

  // Action dispatchers set to store for component event interaction
  const setMovCardDispatch = useBoardStore( state => state.setMovCardDispatch );
  setMovCardDispatch(dispatchSelectedMovCard);
  const setPosDispatch = useBoardStore( state => state.setDispatchPositions );
  setPosDispatch(dispatchPositions);
  const setFigCardsDispatch = useFigCardStore( state => state.setFigCardsDispatch);
  setFigCardsDispatch(dispatchFigCards);

  useEffect(()=>{
    if(!statePlayerMe?.has_turn) {
      return;
    }
    if(!positions.first_position || !positions.second_position) {
      return;
    }

    try {
      makePartialMove(
        room_id,
        user_name,
        selectedMovCard.card.index,
        positions.first_position.pos_x,
        positions.first_position.pos_y,
        positions.second_position.pos_x,
        positions.second_position.pos_y
      );
      dispatchPositions({type : "resetPositions"});
      dispatchSelectedMovCard({type : "resetMovCard"});
    } catch {
      dispatchPositions({type : "resetPositions"});
      dispatchSelectedMovCard({type : "resetMovCard"});
    }
  },[positions, selectedMovCard, statePlayerMe]);

  if (!userId) setUserId(user_id);


  // Event handlers, leave, pass turn, discard figure, revert partial move
  const handleDiscardFigure = async (tile) => {
    if(!selectedFigCards.player || selectedFigCards.index == null) return;

    try {
      if(selectedFigCards.player != user_name){
        await blockFigure(
          room_id,
          user_name, 
          selectedFigCards.player,
          selectedFigCards.index,
          tile.x,
          tile.y,
        )
      } else {
        await discardFigure(
          room_id,
          selectedFigCards.player,
          selectedFigCards.index,
          tile.x,
          tile.y,
        );
      }
      dispatchFigCards({ type: "deselect" });
      dispatchPositions({ type : "resetPositions"});
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassTurn = async () => {
    try {
      await passTurn(room_id, user_name);
      dispatchPositions({type : "resetPositions"})
      dispatchSelectedMovCard({type : "resetMovCard"});
    } catch (error) {
      dispatchPositions({type : "resetPositions"})
      dispatchSelectedMovCard({type : "resetMovCard"});
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

  const handleRevertMove = async () => {
    try {
      await undoPartialMove(room_id, user_name);
    } catch (error) {
      console.log(error);
    }
  };

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
      handleLeaveMatch={handleLeaveMatch}
      handlePassTurn={handlePassTurn}
      handleDiscardFigure={handleDiscardFigure}
      handleRevertMove={handleRevertMove}
    />
  );
}
