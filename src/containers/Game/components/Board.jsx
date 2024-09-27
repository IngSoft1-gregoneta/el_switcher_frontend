import React from "react";
import BoardClass from "../logic/board";
import "../styles/styles.css";

const board = new BoardClass();
// board.printBoard();

const COLORS = Object.freeze({
  EMERALD: "bg-emerald-600",
  TEAL: "bg-teal-600",
  AMBER: "bg-amber-600",
  STONE: "bg-stone-600",
});

function Tile({ color }) {
  return (
    <div className={`tile ${color} h-full w-full rounded`}>
      <p>ficha</p>
    </div>
  );
}

export default function Board() {
  return (
    <div className="flex h-full max-h-full w-full max-w-full justify-center">
      <div className="grid grid-cols-6 grid-rows-6 gap-1 md:gap-2">
        {board.tiles.map((row, rowIndex) =>
          row.map((ficha, colIndex) => {
            let tileColor;
            switch (ficha.color) {
              case 0:
                tileColor = COLORS.EMERALD;
                break;
              case 1:
                tileColor = COLORS.TEAL;
                break;
              case 2:
                tileColor = COLORS.STONE;
                break;
              case 3:
                tileColor = COLORS.AMBER;
                break;
              default:
                tileColor = "";
            }
            return <Tile key={`${rowIndex}-${colIndex}`} color={tileColor} />;
          }),
        )}
      </div>
    </div>
  );
}
