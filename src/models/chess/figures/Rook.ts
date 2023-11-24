import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Rook extends Figure {
    constructor(public position: Position, side: Color) {
        super("rook", position, side);
    }
    isPossibleMove(board: Board, cell: Cell): boolean {
        if(!super.isPossibleMove(board, cell)) return false;
        const emptyVertical = board.isEmptyVertical(this.position, cell.position);
        const emptyHorizontal = board.isEmptyHorizontal(this.position, cell.position);
        return emptyHorizontal || emptyVertical
    }

    canMoveTo(board: Board, cell: Cell): boolean {
        if (!super.canMoveTo(board, cell)) return false;
        return this.checkIsDanger(board, cell);
    }
}