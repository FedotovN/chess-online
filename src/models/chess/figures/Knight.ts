import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Knight extends Figure {
    constructor(public position: Position, side: Color) {
        super("knight", position, side);
    }
    isOnPath(board: Board, cell: Cell): boolean {
        if(!super.isOnPath(board, cell)) return false;
        const { x: currX, y: currY} = this.position;
        const { x: targetX, y: targetY } = cell.position;
        const absX = Math.abs(currX - targetX);
        const absY = Math.abs(currY - targetY);
        return absX === 1 && absY === 2 || absX === 2 && absY === 1;
    }

    canMoveTo(board: Board, cell: Cell): boolean {
        return super.canMoveTo(board, cell) && !super.isCheckTo(board, cell);
    }
}