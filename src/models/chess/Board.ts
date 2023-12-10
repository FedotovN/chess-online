import Cell from "~/models/chess/Cell";
import Pawn from "./figures/Pawn";
import Knight from "./figures/Knight"
import Rook from "./figures/Rook"
import King from "./figures/King"
import Queen from "./figures/Queen"
import Bishop from "./figures/Bishop"
import Figure from "./figures/Figure";
import { GameOverType } from "~/types/chess/Game";
import type ChessMove from "@/types/chess/Move";
import type { Color } from "~/types/chess/Color";
import type { Position } from "~/types/chess/Position";
import type { FigureName } from "~/types/chess/FigureName";
import type { GameOverInfo } from "~/types/chess/Game";
import { getBoardInstance } from "~/services/chess/helpers";
export default class Board {
    cells: { [key: string]: Array<Cell> } = {};
    moves: ChessMove[] = [];
    side: Color = 'white';
    constructor() {
        this.addCells();
        this.addFigures();
    }
    isGameOver(): GameOverInfo | false {
        const getInfo = (type: GameOverType, side?: Color) => {
            return {
                type,
                winner: side === 'white' ? 'black' : 'white',
                movesAmount: this.moves.length,
             } as GameOverInfo
        }
        return (['white', 'black'] as const).map((side: Color) => {
            if (this.isCheckmate(side)) return getInfo(GameOverType.CHECKMATE, side);
            else if (this.isStalemate(side)) return getInfo(GameOverType.STALEMATE, side);
            return false;
        }).filter(i => i)[0];
    }
    copy() {
        return getBoardInstance({ ...this });
    }
    switchSide() {
        this.side = this.side === 'white' ? 'black' : 'white';
    }
    move(from: Cell, to: Cell) {
        const { figure } = from;
        const canMove = figure && figure.canMoveTo(this, to);
        if (!canMove) return false;
        if (this.checkEnPassant(figure, to)) this.enPassant(from, to);
        else if (this.checkCastle(from, to)) this.castle(from, to);
        else this.moveFigure(from, to);
        this.moves.push({ figure: figure.name, from: from.position, to: to.position, side: figure.side });
        this.switchSide();
        return true;
    }
    enPassant(from: Cell, to: Cell) {
        this.getCell(this.getLastMove().to).figure = null
        this.moveFigure(from, to);
    }
    castle(from: Cell, to: Cell): boolean {
        const { x: rookX, y } = to.position;
        const { x: kingX } = from.position;
        const isOnLeft = kingX - rookX > 0;
        const step = isOnLeft ? -2 : 2;
        const rookStep = isOnLeft ? 1 : -1;
        const targetCell = this.getCell({ x: kingX + step, y } as Position);
        const rookCell = this.getCell({ x:  kingX + step + rookStep, y } as Position);
        this.moveFigure(from, targetCell);
        this.moveFigure(to, rookCell);
        return true;
    }
    moveFigure(from: Cell, to: Cell) {
        const { figure } = from;
        if (!figure) return;
        if (figure instanceof Pawn || figure instanceof King || figure instanceof Rook) {
            figure.isFirstMove = false;
        }
        figure.position = to.position
        to.figure = figure;
        from.figure = null;
    }
    getLastMove() {
        return this.moves[this.moves.length - 1];
    }
    checkEnPassant(pawn: Figure, cell: Cell) {
        if (!(pawn instanceof Pawn)) return false;
        const last = this.getLastMove();
        if (!last || last.figure !== 'pawn') return false;
        const sameX =  last.to.x === cell.position.x;
        const movedTwoSteps = last.to.y - last.from.y === pawn.getModifier() * 2;
        const wentThrough = last.to.y - cell.position.y === pawn.getModifier();
        return sameX && wentThrough && movedTwoSteps;
    }
    getPromotedPawn(side: Color) {
        const horizon = side === 'white' ? 7 : 0;
        const pawns = this.getNameFigures('pawn')
            .filter(p => p.side === side)
            .filter(p => p.position.y === horizon);
        return pawns[0];
    }
    getAllCells() {
        return Object.keys(this.cells)
        .map(column => this.cells[column])
        .flat()
    }
    isCheck(side: Color) {
        const king = this.getKing(side);
        if (!king) return false;
        const { position } = king;
        return Cell.isAttacked(this, position, king.getEnemySide());
    }
    getCell(position: Position) {
        return this.cells[position.x][position.y];
    }
    getSideFigures(side: Color) {
        return this.getAllFigures().filter(figure => figure.side === side);
    }
    private isCheckmate(side: Color) {
        return this.isCheck(side) && !this.sideHasMoves(side);
    }
    private isStalemate(side: Color) {
        return !this.isCheck(side) && !this.sideHasMoves(side);
    }
    private sideHasMoves(side: Color) {
        const figures = this.getSideFigures(side);
        for (let i = 0; i < figures.length; i++) {
            if (figures[i].getMoves(this).length) return true;
        }
        return false
    }
    private checkCastle(from: Cell, to: Cell) {
        return from.figure instanceof King && to.figure instanceof Rook;
    }
    private getAllFigures() {
        return this.getAllCells()
        .filter(cell => !cell.isEmpty())
                .map(cell => cell.figure) as Figure[];
        
    }
    private getNameFigures<T extends Figure>(name: FigureName) {
        return this.getAllFigures().filter(figure => figure.name === name) as T[];
    }
    private getKing(side: Color) {
        return this.getNameFigures('king').find(king => king.side === side) as King;
    }
    private addCells() {
        for (let x = 0; x < 8; x++) {
            this.cells[x] = [];
            for (let y = 0; y < 8; y++) {
                this.cells[x][y] = new Cell(this.getCellColor(x, y), null, { x, y } as Position);
            }
        }
    }
    private addFigures() {
        this.addPawns();
        // this.addRooks();
        // this.addKnights();
        // this.addBishops();
        // this.addQueens();
        // this.addKings();
    }
    private addKnights() {
        this.cells[1][0].figure = new Knight({ x: 1, y: 0 } as Position, 'white')
        this.cells[6][0].figure = new Knight({ x: 6, y: 0 } as Position, 'white')
        this.cells[6][7].figure = new Knight({ x: 6, y: 7 } as Position, 'black')
        this.cells[1][7].figure = new Knight({ x: 1, y: 7 } as Position, 'black')
    }
    private addBishops() {
        this.cells[2][0].figure = new Bishop({ x: 2, y: 0 } as Position, 'white')
        this.cells[5][0].figure = new Bishop({ x: 5, y: 0 } as Position, 'white')
        this.cells[2][7].figure = new Bishop({ x: 2, y: 7 } as Position, 'black')
        this.cells[5][7].figure = new Bishop({ x: 5, y: 7 } as Position, 'black')
    }
    private addQueens() {
        this.cells[4][0].figure = new Queen({ x: 4, y: 0 } as Position, 'white')
        this.cells[4][7].figure = new Queen({ x: 4, y: 7 } as Position, 'black')
    }
    private addKings() {
        this.cells[3][0].figure = new King({ x: 3, y: 0 } as Position, 'white')
        this.cells[3][7].figure = new King({ x: 3, y: 7 } as Position, 'black')
    }
    private addPawns() {
        for (let i = 0; i < 8; i++) {
            this.cells[i][1].figure = new Pawn({ x: i, y: 1 } as Position, 'white')
        }
        for (let i = 0; i < 8; i++) {
            this.cells[i][6].figure = new Pawn({ x: i, y: 6 } as Position, 'black')
        }
    }
    private addRooks() {
        this.cells[7][0].figure = new Rook({ x: 7, y: 0 } as Position, 'white')
        this.cells[0][0].figure = new Rook({ x: 0, y: 0 } as Position, 'white')
        this.cells[0][7].figure = new Rook({ x: 0, y: 7 } as Position, 'black')
        this.cells[7][7].figure = new Rook({ x: 7, y: 7 } as Position, 'black')
    }
    private getCellColor(x: number, y: number) {
        const isEvenRow = y % 2 === 0;
        const isEvenCell = (x + (isEvenRow ? 1 : 0)) % 2 === 0;
        return isEvenCell ? 'black' : 'white';
    }
}
