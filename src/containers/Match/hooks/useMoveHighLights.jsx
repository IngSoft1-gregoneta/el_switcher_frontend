import { useEffect } from "react";

export function useMoveHighLights(selectedMovCard, board, firstPos, statePlayerMe, setHighlightedTiles){
    useEffect(() => {
        if (
            statePlayerMe?.has_turn &&
            selectedMovCard && 
            firstPos && 
            board
          ) {
          board.disableHighlights();
          const highlited_tiles = board.higlightTiles(firstPos, selectedMovCard.vectors);
          setHighlightedTiles(highlited_tiles);
        }
    }, [selectedMovCard, board, firstPos, statePlayerMe]);
};