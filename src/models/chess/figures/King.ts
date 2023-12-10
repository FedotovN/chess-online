import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";
import Rook from "./Rook";

export default class King extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("king", position, side);
    }
    isOnPath(board: Board, cell: Cell): boolean {
        if (!super.isOnPath(board, cell)) return false;
        const { x: targetX, y: targetY } = cell.position;
        const { x: currX, y: currY } = this.position;
        
        const absX = Math.abs(targetX - currX);
        const absY = Math.abs(targetY - currY);
        const isHorizontal = absX === 1 && absY === 0;
        const isVertical = absX === 0 && absY === 1;
        const isDiagonal = absX === 1 && absY === 1;

        return isDiagonal || isHorizontal || isVertical;
    }   
    canCastleTo(board: Board, cell: Cell) {
        const copy = board.copy();
        const curr = copy.getCell(this.position);
        const target = copy.getCell(cell.position);
        copy.castle(curr, target);
        return !copy.isCheck(this.side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        const canCastle = this.isFirstMove
            && cell.figure
            && cell.figure instanceof Rook
            && cell.figure.side === this.side
            && cell.figure.isFirstMove === true
            && Cell.isEmptyHorizontal(board, this.position, cell.position);
        if (canCastle) return this.canCastleTo(board, cell);
        return super.canMoveTo(board, cell) && !super.isCheckTo(board, cell);
    }
}