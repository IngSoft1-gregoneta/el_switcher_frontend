export default class TileClass {
  constructor(color, pos, figure) {
    this.color = color;
    this.pos = {
      x: pos.x,
      y: pos.y,
    };
    this.figure = figure;
  }
}

