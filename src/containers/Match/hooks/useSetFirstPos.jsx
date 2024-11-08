import { useBoardStore } from "../../../zustand/store";
import { useEffect } from "react";

export default function useSetFirstPos(positions, statePlayerMe){
  const setFirstPos = useBoardStore(state => state.setFirstPos);
  
  useEffect(()=>{
    if(!statePlayerMe?.has_turn) return;

    if(positions.first_position){
      setFirstPos(positions.first_position);
    } else {
      setFirstPos(null);
    }
  },[positions, statePlayerMe]);
}
