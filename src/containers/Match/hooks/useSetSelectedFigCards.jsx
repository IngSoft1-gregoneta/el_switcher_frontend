import { useEffect } from "react";
import { useFigCardStore } from "../../../zustand/store";

export default function useSetSelectedFigCards(selectedFigCards){
  const setSetSelectedFigCards = useFigCardStore(state => state.setSelectedFigCards)  

  useEffect(()=>{
    if(selectedFigCards){
      setSetSelectedFigCards(selectedFigCards);
    }
  },[selectedFigCards]);
}
