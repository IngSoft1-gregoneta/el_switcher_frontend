
import "../styles/styles.css";
import Tile from "./Tile";
import { useBoardStore } from "../../../zustand/store";
import Spinner from "../../../components/Spinner";

const COLORS = Object.freeze({
  YELLOW: "bg-yellow-500",
  GREEN: "bg-green-600",
  RED: "bg-red-600",
  BLUE: "bg-blue-700",
});

const COLOR_MAP = {
  Yellow: COLORS.YELLOW,
  Green: COLORS.GREEN,
  Red: COLORS.RED,
  Blue: COLORS.BLUE,
};

const getTileColor = (color) => {
  return COLOR_MAP[color] || "bg-amber-600";
};

export default function Board({ handleDiscardFigure }) {
  const board = useBoardStore((state) => state.board);

  if (!board) {
    return <Spinner />;
  } else {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br p-8">
        <div className="relative justify-center items-center grid grid-cols-6 grid-rows-6 gap-1 md:gap-1 p-2 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.4),inset_8px_8px_16px_rgba(255,255,255,0.1)]">
          {board.tiles.map((row, rowIndex) =>
            row.map((ficha, colIndex) => {
              return (
                <Tile
                  onClick={() =>
                    handleDiscardFigure({ x: colIndex, y: rowIndex })
                  }
                  key={`${rowIndex}-${colIndex}`}
                  posx={colIndex}
                  posy={rowIndex}
                  color={getTileColor(ficha.color)}
                  figure={ficha.figure}
                />
              );
            }),
          )}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 opacity-80 shadow-lg z-0" />
        </div>
      </div>
    );
  }
}

