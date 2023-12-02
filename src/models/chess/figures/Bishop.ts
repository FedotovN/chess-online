import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Board from "../Board";
import Figure from "./Figure";
import Cell from "~/models/chess/Cell";

export default class Bishop extends Figure {
    constructor(public position: Position, side: Color) {
        super("bishop", position, side);
    }
    isOnPath(board: Board, cell: Cell): boolean {
        if(!super.isOnPath(board, cell)) return false;
        return Cell.isEmptyDiagonal(board, this.position, cell.position);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) return false;
        return super.canMoveTo(board, cell) && !super.isCheckTo(board, cell);
    }
}