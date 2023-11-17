import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Knight extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("knight", position, side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) {
            return false;
        }
        const { x: currX, y: currY} = this.position;
        const { x: targetX, y: targetY } = cell.position;
        const absX = Math.abs(currX - targetX);
        const absY = Math.abs(currY - targetY);
        return absX === 1 && absY === 2 || absX === 2 && absY === 1
    }
}