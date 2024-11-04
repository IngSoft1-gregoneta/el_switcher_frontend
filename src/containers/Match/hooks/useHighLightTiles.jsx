import { useEffect } from "react";
import { useBoardStore } from "../../../zustand/store";

export default function useHighLightTiles(positions, selectedMovCard, board, statePlayerMe){
  const setHighlightedTiles = useBoardStore( state => state.setHighlightedTiles );

  useEffect(()=>{
    if(
      !board || !selectedMovCard?.card || !statePlayerMe?.has_turn || 
      !positions.first_position || selectedMovCard.card?.is_used
    ) {
      setHighlightedTiles(null);
      return;
    }

    board.disableHighlights();
    const highlited_tiles = board.highlightTiles(positions.first_position, selectedMovCard.card?.vectors);
    setHighlightedTiles(highlited_tiles);

  },[positions, selectedMovCard, board, statePlayerMe]);
}
