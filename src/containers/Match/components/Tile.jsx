import React from "react";
import { useBoardStore } from "../../../zustand/store";

export default function Tile({ color, posx, posy }) {
    const firstPos = useBoardStore((state) => state.firstPos);
    const secondPos = useBoardStore((state) => state.secondPos);
    const setFirstPos = useBoardStore((state) => state.setFirstPos);
    const setSecondPos = useBoardStore((state) => state.setSecondPos);

    const handleTileClick = () => {
        if (!firstPos && !secondPos) {
            setFirstPos({ pos_x: posx, pos_y: posy });
        } else if (firstPos && !secondPos) {
            setSecondPos({ pos_x: posx, pos_y: posy });
        } else if (firstPos === secondPos){
            setFirstPos(null);
            setSecondPos(null);
        }
    };

    return (
      <div
        onClick={handleTileClick}
        className={`tile ${color} m-1 min-h-[50px] min-w-[50px] rounded`}
      ></div>
    );
  }