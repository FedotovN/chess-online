import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Queen extends Figure {
    constructor(public position: Position, side: Color) {
        super("queen", position, side);
    }
    isPossibleMove(board: Board, cell: Cell): boolean {
        if(!super.isPossibleMove(board, cell)) return false;
        const emptyVertical = board.isEmptyVertical(this.position, cell.position);
        const emptyHorizontal = board.isEmptyHorizontal(this.position, cell.position);
        const emptyDiagonal = board.isEmptyDiagonal(this.position, cell.position);
        return emptyVertical || emptyHorizontal || emptyDiagonal
    }

    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) return false;
        return this.checkIsDanger(board, cell);
    }
}