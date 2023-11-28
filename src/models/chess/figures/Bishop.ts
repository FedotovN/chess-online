import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Bishop extends Figure {
    constructor(public position: Position, side: Color) {
        super("bishop", position, side);
    }
    isPossibleMove(board: Board, cell: Cell): boolean {
        if(!super.isPossibleMove(board, cell)) return false;
        return Cell.isEmptyDiagonal(board, this.position, cell.position);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) return false;
        return this.checkIsDanger(board, cell);
    }
}