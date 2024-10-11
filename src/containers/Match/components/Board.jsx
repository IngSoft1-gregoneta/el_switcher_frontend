import React, { useEffect } from "react";
import BoardClass from "../logic/board";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import Tile from "./Tile";
import { useBoardStore } from "../../../zustand/store";


//TODO : is this even a good implementation??
//       should this even be here??
const COLORS = Object.freeze({
  YELLOW: "bg-yellow-600",
  GREEN: "bg-green-600",
  RED: "bg-red-600",
  BLUE: "bg-blue-600",
});

const COLOR_MAP = {
  Yellow: COLORS.YELLOW,
  Green: COLORS.GREEN,
  Red: COLORS.RED,
  Blue: COLORS.BLUE,
};

const getTileColor = (color) => {
  return COLOR_MAP[color] || "bg-amber-600"; // Fallback color
};

export default function Board() {
  const navigate = useNavigate();

  const board = useBoardStore((state) => state.board);

  //TODO : maybe redirecting to root is not the best solution???
  useEffect(() => {
    if (!board) {
      navigate("/");
      return null;
    }
  }, [navigate, board]);


  return (
    <div className="flex h-full max-h-full w-full max-w-full justify-center">
      <div className="grid grid-cols-6 grid-rows-6 gap-1 md:gap-2">
        {board.tiles.map((row, rowIndex) =>
          row.map((ficha, colIndex) => {
            return (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                posx={colIndex} posy={rowIndex} color={getTileColor(ficha.color)}
                figure={ficha.figure}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}