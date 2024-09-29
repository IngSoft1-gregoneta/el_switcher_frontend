import { useBoardStore } from "../../../services/state";
import { useNavigate } from "react-router-dom";

//TODO : is this even a good implementation??
//       should this even be here??
const COLORS = Object.freeze({
    YELLOW: "bg-yellow-600",
    GREEN: "bg-green-600",
    RED: "bg-red-600",
    BLUE: "bg-blue-600"
});

function Tile({ color }) {
    return (
        <div className={`tile ${color} rounded m-1`}>
            <p>ficha</p>
        </div>
    );
}

export default function Board() {
    const stateBoard = useBoardStore((state) => state.stateBoard);
    const navigate = useNavigate();

    //TODO : maybe redirecting to root is not the best solution???
    if (!stateBoard) {
        navigate("/");
        return null;
    }

    const board = new BoardClass(stateBoard);

    return (

    <div className="flex h-full max-h-full w-full max-w-full justify-center">
      <div className="grid grid-cols-6 grid-rows-6 gap-1 md:gap-2">
        {/* <div className="flex items-center justify-center h-screen"> */}
        {/*     <div className="grid grid-cols-6 grid-rows-6 gap-2 mx-auto w-[70vw]"> */}
                {board.tiles.map((row, rowIndex) =>
                    row.map((ficha, colIndex) => {
                        let tileColor;
                        //TODO : maybe this way of matching colors is prone to breaking
                        //       how do we solve it?? a mistery for humand kind to wonder
                        switch (ficha.color) {
                            case "Yellow":
                                tileColor = COLORS.YELLOW;
                                break;
                            case "Green":
                                tileColor = COLORS.GREEN;
                                break;
                            case "Red":
                                tileColor = COLORS.RED;
                                break;
                            case "Blue":
                                tileColor = COLORS.BLUE;
                                break;
                            default:
                                tileColor = "bg-amber-600";
                        }
                        return (
                            <Tile
                                key={`${rowIndex}-${colIndex}`}
                                color={tileColor}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
