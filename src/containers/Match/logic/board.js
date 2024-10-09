import Parser from "./parser.js";
import "./tile.js";

function notInRange(max, min, val){
  if(val > max) return true;
  if(val < min) return true;
  return false;
}

export default class BoardClass {
  constructor(boardFromServer) {
    if (boardFromServer === null)
      throw new Error("Expected a board got : ", boardFromServer);
    if (boardFromServer.length > 36)
      throw new Error("The board cannot have over 36 tiles!!!!");

    this.tiles = Array.from({ length: 6 }, () =>
      Array.from({ length: 6 }, () => null),
    );
    boardFromServer.forEach((tileFromServer) => {
      let tile = Parser.parseTile(tileFromServer);
      this.tiles[tile.pos.x][tile.pos.y] = tile;
    });
  }

  switchTiles(pos1, pos2) {
    if(pos1 == null || pos2 == null){
      throw new Error(`Expected position got: pos1=${pos1}, pos2=${pos2}`);
    }
    if(!("pos_x" in pos1) || !("pos_y" in pos1)){
      throw new Error("Expected position to have pos_x and pos_y properties, got: ",pos1);
    }
    if(!("pos_x" in pos2) || !("pos_y" in pos2)){
      throw new Error("Expected position to have pos_x and pos_y properties, got: ",pos2);
    }
    if(isNaN(pos1.pos_x) || isNaN(pos1.pos_y)){
      throw new Error(`Expected x and y position values to be numbers, got: pos_x = ${pos1.pos_x}, pos_y=${pos1.pos_y}`);
    }
    if(isNaN(pos2.pos_x) || isNaN(pos2.pos_y)){
      throw new Error(`Expected x and y position values to be numbers, got: pos_x = ${pos2.pos_x}, pos_y=${pos2.pos_y}`);
    }
    if(notInRange(5,0,pos1.pos_x) || notInRange(5,0,pos1.pos_y)){
      throw new Error(`Position 1 has a value outside the range of the board: pos1=${pos1}`);
    }
    if(notInRange(5,0,pos2.pos_x) || notInRange(5,0,pos2.pos_y)){
      throw new Error(`Position 1 has a value outside the range of the board: pos1=${pos2}`);
    }

    // las posiciones en el tablero estan invertidas??????
    let tile1 = this.tiles[pos1.pos_y][pos1.pos_x];
    let tile2 = this.tiles[pos2.pos_y][pos2.pos_x];
    this.tiles[pos1.pos_y][pos1.pos_x] = tile2;
    this.tiles[pos2.pos_y][pos2.pos_x] = tile1;  
  }

  printBoard() {
    this.tiles.forEach((e) => {
      e.forEach((x) => console.log(x.color));
    });
  }
}

