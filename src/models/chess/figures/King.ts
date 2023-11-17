import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class King extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("king", position, side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) {
            return false;
        }
        return true;
    }
}