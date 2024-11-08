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
      <div className="flex h-full w-full items-center justify-center bg-"> {/* Fondo del tablero */}
        <div className="grid grid-cols-6 grid-rows-6 gap-1 md:gap-2 p-2 rounded-lg relative"> {/* Espaciado y bordes redondeados */}
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
          <div className="absolute inset-0 bg-gray-800 z-0 rounded-lg" /> {/* Fondo azul detrás del tablero */}
        </div>
      </div>
    );
  }
}
