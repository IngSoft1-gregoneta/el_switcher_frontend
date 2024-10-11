import React, { useEffect, useState } from "react";
import { useBoardStore } from "../../../zustand/store";

export default function Tile({ color, posx, posy, highlight, figure }) {
  const firstPos = useBoardStore((state) => state.firstPos);
  const secondPos = useBoardStore((state) => state.secondPos);
  const setFirstPos = useBoardStore((state) => state.setFirstPos);
  const setSecondPos = useBoardStore((state) => state.setSecondPos);
  const [selected, setSelected] = useState(false);

  const handleTileClick = () => {
    setSelected(!selected);
    if (!firstPos && !secondPos) {
      setFirstPos({ pos_x: posx, pos_y: posy });
    } else if (firstPos && !secondPos) {
      setSecondPos({ pos_x: posx, pos_y: posy });
    } else if (firstPos === secondPos) {
      setFirstPos(null);
      setSecondPos(null);
    }
  };

  useEffect(()=>{
    if(firstPos && secondPos && selected){
      setSelected(!selected);
    }
  },[firstPos,secondPos])

  if(selected){
    return(
      <div
      onClick={handleTileClick}
      className={`selected_tile ${color} m-1 min-h-[50px] min-w-[50px] rounded`}
    ></div>
    );
  }

  if(highlight){
    return(
      <div
      onClick={handleTileClick}
      className={`highlighted_tile ${color} m-1 min-h-[50px] min-w-[50px] rounded`}
    ></div>
    );
  }

  const classAtt =
    figure == "None"
      ? ""
      : "bg-gradient-to-br from-purple-600  to-indigo-700 opacity-55 blur transition duration-500 group-hover:opacity-100";
  return (
    <div className="align-center group relative flex h-8 w-8 items-center justify-center rounded object-center sm:h-16 sm:w-16">
      <div
        data-testid="tile"
        className={`absolute inset-0 z-0 rounded-lg ${classAtt}`}
      ></div>
      <div
        onClick={handleTileClick}
        className={`tile ${color} inset-0 z-50 m-1 min-h-[50px] min-w-[50px] rounded`}
      ></div>
    </div>
  );
}