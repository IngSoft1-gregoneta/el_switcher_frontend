import React from "react";
import { useBoardStore } from "../../../zustand/store";
import bubble1 from "../../assets/bubblesound1.wav";
import bubble2 from "../../assets/bubblesound2.wav";
import bubble3 from "../../assets/bubblesound3.wav";
import bubble4 from "../../assets/bubblesound4.wav";

function inHighlighted(posx, posy, arroftiles = []) {
  if (arroftiles == null) return false;
  return arroftiles.some((tile) => tile.pos.x === posx && tile.pos.y === posy);
}

export default function Tile({ color, posx, posy, figure, onClick }) {
  const firstPos = useBoardStore((state) => state.firstPos);
  const highlightedTiles = useBoardStore((state) => state.highlightedTiles);
  const audiolist = [bubble1,bubble2,bubble3,bubble4]
  const dispatchPositions = useBoardStore(state => state.dispatchPositions);
  const handleTileClick = () => {
    
    onClick();
    dispatchPositions({ type : "setTilePosition" , position : { pos_x : posx , pos_y : posy } })
    let n = Math.random(4)
    let audioselected = audiolist[n];
    new Audio(audioselected).play();
    if (highlightedTiles && !inHighlighted(posy, posx, highlightedTiles)) {
      return;
    }
  };

  const getClassAttStyle = () => {
    switch (color) {
      case "bg-yellow-500":
        return "bg-yellow-400 blur z-10";
      case "bg-green-600":
        return "bg-green-500 blur z-10";
      case "bg-red-600":
        return "bg-red-500 blur z-10";
      case "bg-blue-700":
        return "bg-blue-600 blur z-10";
      default:
        return "bg-gray-600 blur z-10";
    }
  };

  const lightStyle =
    "ring-4 ring-indigo-500 border-2 border-blue-400 shadow-xl transition duration-500 ease-in-out transform scale-105 z-30";

  const highlight = !highlightedTiles
    ? ""
    : inHighlighted(posy, posx, highlightedTiles)
    ? lightStyle
    : "";

  const originStyle =
    "ring-4 ring-pink-500 border-2 border-red-400 shadow-xl transition duration-500 ease-in-out transform scale-105 z-30";

  const origin = !firstPos
    ? ""
    : firstPos.pos_x == posx && firstPos.pos_y == posy
    ? originStyle
    : "";

  const classAttStyle = getClassAttStyle();
  const classAtt = figure === "None" ? "" : classAttStyle;

  return (
    <div className="align-center group relative flex h-8 w-8 items-center justify-center rounded object-center sm:h-16 sm:w-16">
      <div data-testid="tile-background" className={`absolute inset-0 rounded-lg ${classAtt}`} />
      <div data-testid="tile-highlight" className={`absolute inset-0 rounded-lg ${highlight}`} />
      <div data-testid="tile-origin" className={`absolute inset-0 rounded-lg ${origin}`} />
      <div
        data-testid="actual-tile"
        onClick={handleTileClick}
        className={`tile ${color} inset-0 z-40 m-1 min-h-[50px] min-w-[50px] rounded`}
      />
    </div>
  );
  
}
