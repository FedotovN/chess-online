import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

export default class King extends Figure {
    isFirstMove = true;
    constructor(public position: Position, side: Color) {
        super("king", position, side);
    }
    canMoveTo(board: Board, cell: Cell, checkAttack: boolean = true): boolean {
        const basicRules = super.canMoveTo(board, cell);
        const { x: targetX, y: targetY } = cell.position;
        const { x: currX, y: currY } = this.position;
        const absX = Math.abs(targetX - currX);
        const absY = Math.abs(targetY - currY);
        const isHorizontal = absX === 1 && absY === 0;
        const isVertical = absX === 0 && absY === 1;
        const isDiagonal = absX === 1 && absY === 1;
        const isAttacked = checkAttack
                ? board.isAttacked(cell.position, this.getEnemySide()) 
                : false;
        return basicRules && !isAttacked && (isDiagonal || isHorizontal || isVertical);
    }
}