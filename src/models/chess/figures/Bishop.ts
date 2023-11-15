import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/types/chess/Cell";

export default class Bishop extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("bishop", position, side);
    }
    canMoveTo(cell: Cell): boolean {
        return !!cell;
    }
}