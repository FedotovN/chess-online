import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Rook extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("rook", position, side);
    }
    isOnPath(board: Board, cell: Cell): boolean {
        if(!super.isOnPath(board, cell)) return false;
        const emptyVertical = Cell.isEmptyVertical(board, this.position, cell.position);
        const emptyHorizontal = Cell.isEmptyHorizontal(board, this.position, cell.position);
        return emptyHorizontal || emptyVertical
    }

    canMoveTo(board: Board, cell: Cell): boolean {
        return super.canMoveTo(board, cell) && !super.isCheckTo(board, cell);
    }
}