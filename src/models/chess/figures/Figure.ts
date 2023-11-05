import type { FigureName } from "~/types/chess/FigureName";
import type { Position } from "~/types/chess/Position";
import type { Side } from "~/types/chess/Side";

export default class Figure {
    constructor(public name: FigureName, public position: Position, public side: Side) {}
}