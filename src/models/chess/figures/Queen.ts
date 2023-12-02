import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Queen extends Figure {
    constructor(public position: Position, side: Color) {
        super("queen", position, side);
    }
    isOnPath(board: Board, cell: Cell): boolean {
        if(!super.isOnPath(board, cell)) return false;
        const emptyVertical = Cell.isEmptyVertical(board, this.position, cell.position);
        const emptyHorizontal = Cell.isEmptyHorizontal(board, this.position, cell.position);
        const emptyDiagonal = Cell.isEmptyDiagonal(board, this.position, cell.position);
        return emptyVertical || emptyHorizontal || emptyDiagonal
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        return super.canMoveTo(board, cell) && !super.isCheckTo(board, cell);
    }
}