import type { FigureName } from "~/types/chess/FigureName";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Figure {
    constructor(public name: FigureName, public position: Position, public side: Color) {}
    canMoveTo(board: Board, cell: Cell){
        const sameSide = cell.figure?.side === this.side;
        const samePosition = cell.comparePosition(this.position);
        return !sameSide && !samePosition;
    }
    canAttackTo(board: Board, cell: Cell) {
        return this.canMoveTo(board, cell);
    }
    getEnemySide() {
        return this.side === 'white' ? 'black' : 'white';
    }
}