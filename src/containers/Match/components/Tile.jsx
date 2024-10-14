import React from "react";
import { useBoardStore } from "../../../zustand/store";

function inHighlighted(posx, posy, arroftiles = []) {
  if (arroftiles == null) return false;
  return arroftiles.some((tile) => tile.pos.x === posx && tile.pos.y === posy);
}


export default function Tile({ color, posx, posy, figure}) {
  const firstPos = useBoardStore((state) => state.firstPos);
  const secondPos = useBoardStore((state) => state.secondPos);
  const setFirstPos = useBoardStore((state) => state.setFirstPos);
  const setSecondPos = useBoardStore((state) => state.setSecondPos);
  const highlightedTiles = useBoardStore((state) => state.highlightedTiles);
  const setHighlightedTiles = useBoardStore((state) => state.setHighlightedTiles);
  
  const handleTileClick = () => {
    console.log(`X : ${posx}, Y : ${posy}`);
    // RESET todas las fichas si se selecciona la misma 2 veces
    if (firstPos?.pos_x === posx && firstPos?.pos_y === posy){
      setFirstPos(null);
      setSecondPos(null);
      setHighlightedTiles(null);
    }
    // PASS si la ficha seleccionada no es una opcion valida para el movimiento
    if (highlightedTiles && !inHighlighted(posy, posx, highlightedTiles)) {
      return;
    }
  
    if (!firstPos && !secondPos) {
      setFirstPos({ pos_x: posx, pos_y: posy });
    } else if (firstPos && !secondPos) {
      setSecondPos({ pos_x: posx, pos_y: posy });
    } else if (firstPos.pos_x === secondPos.pos_x && firstPos.pos_y === secondPos.pos_y) {
      setFirstPos(null);
      setSecondPos(null);
    }
  };

  const lightStyle =
    "ring-4 ring-indigo-500 border-2 border-blue-400 shadow-xl transition duration-500 ease-in-out transform scale-105";
  const highlight = !highlightedTiles ? "" : (inHighlighted(posy,posx,highlightedTiles) ? lightStyle : "");

  const originStyle =
    "ring-4 ring-pink-500 border-2 border-red-400 shadow-xl transition duration-500 ease-in-out transform scale-105";
  const origin = !firstPos ? "" : ((firstPos.pos_x == posx && firstPos.pos_y == posy) ? originStyle : "");

  const classAtt =
    figure == "None"
      ? ""
      : "bg-gradient-to-br from-purple-900  to-indigo-900 blur-sm transition duration-500";

  return (
    <div className="align-center group relative flex h-8 w-8 items-center justify-center rounded object-center sm:h-16 sm:w-16">
      <div
        data-testid="tile"
        className={`absolute inset-0 z-0 rounded-lg ${classAtt} ${highlight} ${origin}`}
      ></div>
      <div
        onClick={handleTileClick}
        className={`tile ${color} inset-0 z-50 m-1 min-h-[50px] min-w-[50px] rounded`}
      ></div>
    </div>
  );
}