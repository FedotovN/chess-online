import type { FigureName } from "~/types/chess/FigureName";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/types/chess/Cell";

export default class Figure {
    constructor(public name: FigureName, public position: Position, public side: Color) {}
    canMoveTo(cell: Cell){
        return !!cell;
    }
}