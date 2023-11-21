import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class King extends Figure {
    constructor(public position: Position, side: Color) {
        super("king", position, side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        const basicRules = super.canMoveTo(board, cell);
        const horizontalOnly = Cell.isHorizontal(this.position, cell.position);
        const verticalOnly = Cell.isVertical(this.position, cell.position);
        const diagonal = Cell.isDiagonal(this.position, cell.position);
        return basicRules && (diagonal || horizontalOnly || verticalOnly);
    }
}