import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class Pawn extends Figure {
    isFirstMove: boolean = true;
    constructor(public position: Position, side: Color) {
        super("pawn", position, side);
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        if(!super.canMoveTo(board, cell)) {
            return false;
        }
        const { x: currX, y: currY} = this.position;
        const { x: targetX, y: targetY } = cell.position;
        const isEnemy = cell.figure;
        const sameX = targetX === currX
        const modifier = this.side === 'white' ? 1 : -1;
        const inOneStep = currY - targetY === modifier;
        const inTwoSteps = currY - targetY === modifier * 2;
        const isDiagonal = inOneStep && Math.abs(targetX - currX) === 1
        if (sameX && isEnemy) return false;
        if (sameX && (inOneStep || this.isFirstMove && inTwoSteps)) return true;
        if (isDiagonal && isEnemy) return true;
        return false;
    }
}