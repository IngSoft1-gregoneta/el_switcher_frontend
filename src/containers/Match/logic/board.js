import Parser from "./parser.js";
import "./tile.js";

function notInRange(max, min, val){
  if(val > max) return true;
  if(val < min) return true;
  return false;
}

function inRange(max, min, val){
  return !notInRange(max, min, val);
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
      this.tiles[tile.pos.y][tile.pos.x] = tile;
    });
  }

  highlightTiles(initPos, posVectors){
    if(initPos == null){
      throw new Error(`Expected position got: initPos=${initPos}`);
    }
    if(!("pos_x" in initPos) || !("pos_y" in initPos)){
      throw new Error(`Expected position got: initPos=${initPos}`);
    }
    if(isNaN(initPos.pos_x) || isNaN(initPos.pos_y)){
      throw new Error(`Expected x and y position values to be numbers, got: pos_x = ${initPos.pos_x}, pos_y=${initPos.pos_y}`);
    }
    if(notInRange(5,0,initPos.pos_x) || notInRange(5,0,initPos.pos_y)){
      throw new Error(`Position has a value outside the range of the board: initPos=${initPos}`);
    }
    if(!Array.isArray(posVectors)){
      throw new Error(`Expected an array of position vectors for the move, got: ${posVectors}`);
    }
    if(posVectors.length != 4){
      throw new Error(`Position vectors array must have exactly 4 vectors, got: ${posVectors.length}`);
    }

    const aux = posVectors.map((vector) => ({x: initPos.pos_x + vector[0], y: initPos.pos_y + vector[1]}));

    const validPositions = aux.filter(pos => inRange(5, 0, pos.x) && inRange(5, 0, pos.y));

    validPositions.forEach((pos) => {
      this.tiles[pos.x][pos.y].setHighlightOn();
    });
    
    return validPositions.map(pos => this.tiles[pos.x][pos.y]);
  }

  disableHighlights(){
    this.tiles.forEach((col)=>{
      col.forEach((tile)=>{
        tile.setHighlightOff();
      })
    });
  }

  printBoard() {
    this.tiles.forEach((e) => {
      e.forEach((x) => console.log(x));
    });
  }
}

