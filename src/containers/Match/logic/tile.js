export default class TileClass {
  constructor(color, pos, figure) {
    this.color = color;
    this.is_highlighted = false;
    this.figure = figure;
    this.pos = {
      x: pos.x,
      y: pos.y,
    };
  }
    setHighlightOn(){
        this.is_highlighted = true;
    }
    setHighlightOff(){
        this.is_highlighted = false;
    }
}