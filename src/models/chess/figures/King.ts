import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class King extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("king", position, side);
    }
    isPossibleMove(board: Board, cell: Cell): boolean {
        if(!super.isPossibleMove(board, cell)) return false;
        const { x: targetX, y: targetY } = cell.position;
        const { x: currX, y: currY } = this.position;
        const absX = Math.abs(targetX - currX);
        const absY = Math.abs(targetY - currY);
        const isHorizontal = absX === 1 && absY === 0;
        const isVertical = absX === 0 && absY === 1;
        const isDiagonal = absX === 1 && absY === 1;
        return isDiagonal || isHorizontal || isVertical;
    }

    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) return false;
        return true;
    }
}