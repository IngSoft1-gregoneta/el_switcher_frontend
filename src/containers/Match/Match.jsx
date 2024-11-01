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
} from "./services/MatchService.js";
import { useEffect, useReducer } from "react";
import BoardClass from "./logic/board.js";
import { 
  setPositionReducer, 
  setMovCardReducer, 
  selectFigCardReducer, 
} from "./services/Reducers.js";


export default function Match() {
  const setMatchStarted = useMatchStore((state) => state.setMatchStarted);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const setHighlightedTiles = useBoardStore(
    (state) => state.setHighlightedTiles,
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
  const board = useBoardStore( state => state.board);
  const setBoard = useBoardStore( state => state.setBoard);

  useEffect(() => {
    if(stateBoard){
      setBoard(new BoardClass(stateBoard));
    }
  },[stateBoard, setBoard]);


  const [selectedFigCards, dispatchFigCards] = useReducer(
    selectFigCardReducer,
    { selectedFigCard: null, player: null },
  );

  const setSelectedFigCards = useFigCardStore(state => state.setSelectedFigCards);
  useEffect(()=>{
    setSelectedFigCards(selectedFigCards);
    },[selectedFigCards])

  const [positions, dispatchPositions] = useReducer(
    setPositionReducer,
    { first_position : null, second_position : null },
  );

  const [selectedMovCard, dispatchSelectedMovCard] = useReducer(
    setMovCardReducer,
    { card : null },
  );

  const setMovCardDispatch = useBoardStore( state => state.setMovCardDispatch );
  setMovCardDispatch(dispatchSelectedMovCard);

  const setPosDispatch = useBoardStore( state => state.setDispatch );
  setPosDispatch(dispatchPositions);

  const setFigCardsDispatch = useFigCardStore( state => state.setFigCardsDispatch);
  setFigCardsDispatch(dispatchFigCards);

  useEffect(()=>{
    if(!statePlayerMe?.has_turn) return;
    if(!positions.first_position || !positions.second_position) return;

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

  useEffect(() => {
    if(
      !board || !selectedMovCard.card || !statePlayerMe.has_turn || 
      !positions.first_position || selectedMovCard.card?.is_used
    ) {
      setHighlightedTiles(null);
      return;
    }

    board.disableHighlights();
    const highlited_tiles = board.highlightTiles(positions.first_position, selectedMovCard.card?.vectors);
    setHighlightedTiles(highlited_tiles);
  
  },[positions, selectedMovCard, board, statePlayerMe])

  if (!userId) setUserId(user_id);

  const handleDiscardFigure = async (tile) => {
    if(!selectedFigCards.player || selectedFigCards.index == null) return;

    try {
      await discardFigure(
        room_id,
        selectedFigCards.player,
        selectedFigCards.index,
        tile.x,
        tile.y,
      );
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
