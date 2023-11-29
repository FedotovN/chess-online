import Cell from "~/models/chess/Cell";
import Pawn from "./figures/Pawn";
import Knight from "./figures/Knight"
import Rook from "./figures/Rook"
import King from "./figures/King"
import Queen from "./figures/Queen"
import Bishop from "./figures/Bishop"
import Figure from "./figures/Figure";
import { plainToClass } from "class-transformer";
import { GameOverType } from "~/types/chess/Game";
import type ChessMove from "@/types/chess/Move";
import type { Color } from "~/types/chess/Color";
import type { Position } from "~/types/chess/Position";
import type { FigureName } from "~/types/chess/FigureName";
import type { GameOverInfo } from "~/types/chess/Game";
// Move Figure
// Unmove Figure
// Game Over
// Get cells
// Get figures
// Is Check
// Get moves
export default class Board {
    cells: { [key: string]: Array<Cell> } = {};
    moves: ChessMove[] = [];
    startTimestamp: number;
    constructor() {
        this.addCells();
        this.addFigures();
        this.startTimestamp = Date.now();
    }
    isGameOver(): GameOverInfo | false {
        const getInfo = (type: GameOverType, side?: Color) => {
            return {
                type,
                time: this.getTime(),
                losed: side,
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
        return plainToClass(Board, { ...this });
    }
    getTime() {
        return `${((Date.now() - this.startTimestamp) / 6000).toFixed(2)} minutes`;
    }   
    move(from: Position, to: Position) {
        const prev = this.cells[from.x][from.y];
        const target = this.cells[to.x][to.y];
        if (!prev.figure) return false;
        if (!prev.figure.canMoveTo(this, target)) return false;
        this.swapFigures(prev, target);
        this.moves.push({ figure: this.cells[to.x][to.y].figure!.name, from, to });
        return true;
    }
    swapFigures(from: Cell, to: Cell) {
        if (!from.figure) throw new Error(`No figure was found but trying to swap`);
        if (from.comparePosition(to.position)) return;
        let { position: targetPos } = to;
        to.figure = from.figure;
        to.figure.position = targetPos;
        from.figure = null;
        if (to.figure instanceof Pawn || to.figure instanceof King || to.figure instanceof Rook) {
            to.figure.isFirstMove = false;
        }
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
        console.log(this.isCheck(side));
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
        this.addRooks();
        this.addKnights();
        this.addBishops();
        this.addQueens();
        this.addKings();
    }
    private addKnights() {
        this.cells[1][0].figure = new Knight({ x: 1, y: 0 } as Position, 'black')
        this.cells[6][0].figure = new Knight({ x: 6, y: 0 } as Position, 'black')
        this.cells[6][7].figure = new Knight({ x: 6, y: 7 } as Position, 'white')
        this.cells[1][7].figure = new Knight({ x: 1, y: 7 } as Position, 'white')
    }
    private addBishops() {
        this.cells[2][0].figure = new Bishop({ x: 2, y: 0 } as Position, 'black')
        this.cells[5][0].figure = new Bishop({ x: 5, y: 0 } as Position, 'black')
        this.cells[2][7].figure = new Bishop({ x: 2, y: 7 } as Position, 'white')
        this.cells[5][7].figure = new Bishop({ x: 5, y: 7 } as Position, 'white')
    }
    private addQueens() {
        this.cells[3][0].figure = new Queen({ x: 3, y: 0 } as Position, 'black')
        this.cells[3][7].figure = new Queen({ x: 3, y: 7 } as Position, 'white')
    }
    private addKings() {
        this.cells[4][0].figure = new King({ x: 4, y: 0 } as Position, 'black')
        this.cells[4][7].figure = new King({ x: 4, y: 7 } as Position, 'white')
    }
    private addPawns() {
        for (let i = 0; i < 8; i++) {
            this.cells[i][1].figure = new Pawn({ x: i, y: 1 } as Position, 'black')
        }
        for (let i = 0; i < 8; i++) {
            this.cells[i][6].figure = new Pawn({ x: i, y: 6 } as Position, 'white')
        }
    }
    private addRooks() {
        this.cells[0][0].figure = new Rook({ x: 0, y: 0 } as Position, 'black')
        this.cells[7][0].figure = new Rook({ x: 7, y: 0 } as Position, 'black')
        this.cells[0][7].figure = new Rook({ x: 0, y: 7 } as Position, 'white')
        this.cells[7][7].figure = new Rook({ x: 7, y: 7 } as Position, 'white')
    }
    private getCellColor(x: number, y: number) {
        const isEvenRow = y % 2 === 0;
        const isEvenCell = (x + (isEvenRow ? 1 : 0)) % 2 === 0;
        return isEvenCell ? 'black' : 'white';
    }
}
