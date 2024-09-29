import TileClass from "./tile";

export default class Parser {
    static parseTile(tileObj) {
        const { tile_color, tile_pos_x, tile_pos_y } = tileObj;

        if ([tile_color, tile_pos_x, tile_pos_y].some(value => value === null)) {
            throw new Error(`Expected tile but got: ${JSON.stringify(tileObj)}`);
        }

        if (tile_pos_x > 5 || tile_pos_x < 0 || tile_pos_y > 5 || tile_pos_y < 0) {
            throw new Error(
                `Invalid positions, expected >= 0 and < 6, but got x=${tile_pos_x} , y=${tile_pos_y}`
            );
        }

        return new TileClass(tile_color, { x: tile_pos_x, y: tile_pos_y });
    }
}
