import Figure from "./Figure";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Board from "../Board";
import type Queen from "./Queen";
import type Rook from "./Rook";
import type Knight from "./Knight";
import type Bishop from "./Bishop";
import Cell from "~/models/chess/Cell";

export default class Pawn extends Figure {
    isFirstMove: boolean = true;
    constructor(public position: Position, side: Color) {
        super("pawn", position, side);
    }
    getModifier() {
        return this.side === 'black' ? 1 : -1;
    }
    canEnPassant(board: Board, cell: Cell) {
        const doingEnPassant = board.checkEnPassant(this, cell);
        if (!doingEnPassant) return false;
        return !this.isCheckTo(board, cell);
    }
    isOnPath(board: Board, cell: Cell): boolean {
        if (!super.isOnPath(board, cell)) return false;
        const { x: currX, y: currY} = this.position;
        const { x: targetX, y: targetY } = cell.position;
        const isEnemy = !!cell.figure;
        const sameX = targetX === currX
        const modifier = this.getModifier();
        const inOneStep = currY - targetY === modifier;
        const inTwoSteps = (currY - targetY === modifier * 2) && Cell.isEmptyVertical(board, this.position, cell.position);
        const isDiagonal = inOneStep && Math.abs(targetX - currX) === 1
        const enemyInFront = sameX && isEnemy
        const inOneOrTwoSteps = sameX && (inOneStep || this.isFirstMove && inTwoSteps);
        const enemyInOneStepDiagonal = isDiagonal && isEnemy
        const enPassant = this.canEnPassant(board, cell) && isDiagonal;
        if (enemyInFront) return false;
        return inOneOrTwoSteps || enemyInOneStepDiagonal || enPassant;
    }
    canMoveTo(board: Board, cell: Cell): boolean {
        return super.canMoveTo(board, cell) && !super.isCheckTo(board, cell);
    }
    canAttackTo(board: Board, cell: Cell): boolean {
        const canMove = this.isOnPath(board, cell);
        const isDiagonal = Cell.isEmptyDiagonal(board, this.position, cell.position);
        return canMove && isDiagonal;
    }
    upgradeTo(board: Board, figure: Queen | Rook | Knight | Bishop) {
        const { x, y } = this.position;
        board.cells[x][y].figure = figure;
    }
}