import type { FigureName } from "~/types/chess/FigureName";
import type { Position } from "~/types/chess/Position";
import type { Color } from "~/types/chess/Color";
import Cell from "~/models/chess/Cell";
import type Board from "../Board";

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
        const cpy = board.copy();
        const f = cpy.cells[this.position.x][this.position.y].figure;
        cpy.cells[this.position.x][this.position.y].figure = null;
        cpy.cells[cell.position.x][cell.position.y].figure = f;
        cpy.cells[cell.position.x][cell.position.y].figure!.position = cell.position;
        return cpy.isCheck(this.side);
        
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