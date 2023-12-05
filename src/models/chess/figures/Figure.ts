import type { FigureName } from "~/types/chess/FigureName";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import type Board from "../Board";
import Cell from "~/models/chess/Cell";

export default class Figure {
    constructor(public name: FigureName, public position: Position, public side: Color) {}
    isOnPath(board: Board, cell: Cell) {
        const sameSide = cell.figure?.side === this.side;
        const samePosition = cell.comparePosition(this.position);
        return !sameSide && !samePosition;
    }
    canMoveTo(board: Board, cell: Cell){
        const isKing = cell.figure?.name === 'king';
        return this.isOnPath(board, cell) && !isKing;
    }
    canAttackTo(board: Board, cell: Cell) {
        return this.isOnPath(board, cell);
    }
    isCheckTo(board: Board, cell: Cell) {
        const copy = board.copy();
        const curr = copy.getCell(this.position);
        const target = copy.getCell(cell.position);
        copy.moveFigure(curr, target);
        return copy.isCheck(this.side);
    }
    getEnemySide() {
        return this.side === 'white' ? 'black' : 'white';
    }
    getMoves(board: Board) {
        const cells = board.getAllCells();
        const moves = [];
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (this.canMoveTo(board, cell)) moves.push(cell);
        }
        return moves;
    }
}