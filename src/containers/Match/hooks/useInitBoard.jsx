import { useEffect } from "react";
import { useBoardStore } from "../../../zustand/store";
import BoardClass from "../logic/board";

export default function useInitBoard(stateBoard){
  const setBoard = useBoardStore( state => state.setBoard);

  useEffect(()=>{
    if(stateBoard){
      setBoard(new BoardClass(stateBoard))
    }
  },[stateBoard])
}
