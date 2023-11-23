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
    static isBetween(from: Position, to: Position, curr: Position) {
        const { x: currX, y: currY } = curr;
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;
        const isHorizontal = Cell.isHorizontal(from, to);
        const isVertical = Cell.isVertical(from, to);
        const sameX = currX === toX && currX === fromX;
        const sameY = currY === toY && currY === fromY;
        const betweenX = fromX > toX ? fromX > currX && currX > toX : fromX < currX && currX < toX;
        const betweenY = fromY > toY ? fromY > currY && currY > toY : fromY < currY && currY < toY;
        return isHorizontal ? sameY && betweenY : isVertical ? sameX && betweenX : betweenX && betweenY;
    }
}