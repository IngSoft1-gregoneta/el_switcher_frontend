export default class TileClass{
    constructor(color,pos){
        this.color = color;
        this.is_highlighted = false;
        this.pos = {
            x : pos.x,
            y : pos.y
        }
    }
    setHighlight(){
        this.is_highlighted = true;
    }
}