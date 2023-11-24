import type { FigureName } from "~/types/chess/FigureName";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";
import { plainToClass} from "class-transformer";

export default class Figure {
    constructor(public name: FigureName, public position: Position, public side: Color) {}
    isPossibleMove(board: Board, cell: Cell) {
        const sameSide = cell.figure?.side === this.side;
        const samePosition = cell.comparePosition(this.position);
        return !sameSide && !samePosition;
    }
    canMoveTo(board: Board, cell: Cell){
        const isKing = cell.figure?.name === 'king';
        return this.isPossibleMove(board, cell) && !isKing;
    }
    canAttackTo(board: Board, cell: Cell) {
        return this.isPossibleMove(board, cell);
    }
    checkIsDanger(board: Board, cell: Cell) {
        const cpy = board.copy();
        cpy.cells[this.position.x][this.position.y].figure = null;
        cpy.cells[cell.position.x][cell.position.y].figure = this;
        (cpy.cells[cell.position.x][cell.position.y].figure as this).position = cell.position;
        return !cpy.isCheck(this.side);
    }
    getEnemySide() {
        return this.side === 'white' ? 'black' : 'white';
    }
}