import Figure from "~/models/chess/figures/Figure"
import { type Position } from "../../types/chess/Position"
import { type Color } from "../../types/chess/Color"
export default class Cell {
    constructor(public side: Color, public figure: Figure | null, public position: Position){}
    comparePosition(compare: Position) {
        const sameX = this.position.x == compare.x;
        const sameY = this.position.y == compare.y;
        return sameX && sameY;
    }
    isEmpty() {
        return !this.figure;
    }
}