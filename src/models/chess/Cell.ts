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
    static isVertical(from: Position, to: Position) {
        return from.x === to.x;
    }
    static isHorizontal(from: Position, to: Position) {
        return from.y === to.y
    }
    static isDiagonal(from: Position, to: Position) {
        const absX = Math.abs(to.x - from.x);
        const absY = Math.abs(to.y - from.y); 
        return absY === absX;
    }
}