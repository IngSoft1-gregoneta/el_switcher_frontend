export default class TileClass {
  constructor(color, pos, figure) {
    this.color = color;
    this.is_highlighted = false;
    this.pos = {
      x: pos.x,
      y: pos.y,
    };
    this.figure = figure;
  }
    setHighlight(){
        this.is_highlighted = true;
    }
}