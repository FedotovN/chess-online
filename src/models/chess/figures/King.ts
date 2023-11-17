import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class King extends Figure {
    constructor(public position: Position, side: Color) {
        super("king", position, side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) {
            return false;
        }
        const { x: currX, y: currY} = this.position;
        const { x: targetX, y: targetY } = cell.position;
        const absX = Math.abs(targetX - currX);
        const absY = Math.abs(targetY - currY);
        const horizontalOnly = absX === 1 && absY === 0;
        const verticalOnly = absX === 0 && absY === 1;
        const diagonal = absX === 1 && absY === 1;
        const isEnemy = !!cell.figure
        return (diagonal && isEnemy) || (horizontalOnly || verticalOnly);
    }
}