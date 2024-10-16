import BoardClass from "../logic/board";
import { useEffect } from "react";

export function useBoardInit(stateBoard, setBoard) {
    useEffect(() => {
        if (stateBoard) {
            const newBoard = new BoardClass(stateBoard);
            setBoard(newBoard);
        }
    }, [stateBoard, setBoard]);
}