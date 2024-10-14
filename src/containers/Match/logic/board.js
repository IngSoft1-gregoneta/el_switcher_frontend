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
    // manejo de errores, gracias no tener tipos.
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

  higlightTiles(initPos, posVectors){
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

    const posVector1 = posVectors[0];
    const posVector2 = posVectors[1];
    const posVector3 = posVectors[2];
    const posVector4 = posVectors[3];
  
    // Calculate valid positions based on position vectors
    const validPos1 = {x: initPos.pos_y + posVector1[1], y: initPos.pos_x + posVector1[0]};
    const validPos2 = {x: initPos.pos_y + posVector2[1], y: initPos.pos_x + posVector2[0]};
    const validPos3 = {x: initPos.pos_y + posVector3[1], y: initPos.pos_x + posVector3[0]};
    const validPos4 = {x: initPos.pos_y + posVector4[1], y: initPos.pos_x + posVector4[0]};
  
    // Collect valid positions that are in range
    const aux = [validPos1, validPos2, validPos3, validPos4];
    const validPositions = aux.filter(pos => !notInRange(5, 0, pos.x) && !notInRange(5, 0, pos.y));

    validPositions.forEach((pos) => {
      this.tiles[pos.x][pos.y].setHighlight();
    });
    
    return validPositions.map(pos => this.tiles[pos.x][pos.y]);
  }

  printBoard() {
    this.tiles.forEach((e) => {
      e.forEach((x) => console.log(x));
    });
  }
}

