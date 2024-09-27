import "./tile.js";
import TileClass from "./tile.js";

export default class BoardClass{
    constructor(){
        this.tiles = Array.from({ length: 6 }, () => Array.from({length: 6},()=> null));
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                row[colIndex] = new TileClass(
                    Math.floor(Math.random() * 4),
                    [rowIndex,colIndex]
                );
            })
        });
    }
    printBoard(){
        this.tiles.forEach(e => {
            e.forEach((x) => console.log(x.color))
        });
    }
}