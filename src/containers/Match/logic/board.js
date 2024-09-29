import Parser from "./parser.js";
import "./tile.js";

export default class BoardClass{
    constructor(boardFromServer){
        if (boardFromServer === null) throw new Error("Expected a board got : ",boardFromServer);
        if (boardFromServer.length > 36) throw new Error("The board cannot have over 36 tiles!!!!");

        this.tiles = Array.from({ length: 6 }, () => Array.from({length: 6},()=> null));
        boardFromServer.forEach((tileFromServer)=>{
            let tile = Parser.parseTile(tileFromServer);
            this.tiles[tile.pos.x][tile.pos.y] = tile;
        });
    }
    printBoard(){
        this.tiles.forEach(e => {
            e.forEach((x) => console.log(x.color))
        });
    }
}