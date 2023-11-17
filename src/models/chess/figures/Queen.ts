import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Queen extends Figure {
    constructor(public position: Position, side: Color) {
        super("queen", position, side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        const basicRules = super.canMoveTo(board, cell);
        const emptyVertical = board.isEmptyVertical(this.position, cell.position);
        const emptyHorizontal = board.isEmptyHorizontal(this.position, cell.position);
        const emptyDiagonal = board.isEmptyDiagonal(this.position, cell.position);
        return basicRules && (emptyVertical || emptyHorizontal || emptyDiagonal);
    }
}