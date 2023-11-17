import type ChessMove from "@/types/chess/Move";
import Cell from "~/models/chess/Cell";
import type { Position } from "~/types/chess/Position";
import Pawn from "./figures/Pawn";
import Knight from "./figures/Knight"
import Rook from "./figures/Rook"
import King from "./figures/King"
import Queen from "./figures/Queen"
import Bishop from "./figures/Bishop"
import type Figure from "./figures/Figure";
export default class Board {
    cells: { [key: string]: Array<Cell> } = {};
    moves: ChessMove[] = [];
    constructor() {
        this.addCells();
        this.addFigures();
    }
    moveFigure(from: Position, to: Position): boolean {
        const prev = this.cells[from.x][from.y];
        const target = this.cells[to.x][to.y];
        if (prev.comparePosition(target.position)) return false;
        if (!prev.figure) throw new Error(`No figure was found in coords x: ${from.x} y: ${from.y}`);
        if (!prev.figure.canMoveTo(this, target)) return false;
        target.figure = prev.figure;
        target.figure!.position = { x: to.x, y: to.y };
        if(target.figure instanceof Pawn) {
            target.figure.isFirstMove = false;
        }
        this.cells[from.x][from.y].figure = null;
        this.moves.push({ figure: this.cells[to.x][to.y].figure!.name, from, to });
        return true;
    }
    isEmptyVertical(from: Position, to: Position) {
        if (from.x !== to.x)
            return false;
        const min = Math.min(from.y, to.y);
        const max = Math.max(from.y, to.y);
        for (let y = min + 1; y < max; y++) {
            if(!this.cells[from.x][y].isEmpty()) 
                return false
        }
        return true
    }
    isEmptyHorizontal(from: Position, to: Position) {
        if (from.y !== to.y)
            return false;
        const min = Math.min(from.x, to.x);
        const max = Math.max(from.x, to.x);
        for (let x = min + 1; x < max; x++) {
            if(!this.cells[x][from.y].isEmpty()) 
                return false
        }
        return true
    }
    isEmptyDiagonal(from: Position, to: Position) {
        const absX = Math.abs(to.x - from.x);
        const absY = Math.abs(to.y - from.y); 
        if (absY !== absX) return false;
        const dx = from.x < to.x ? 1 : -1
        const dy = from.y < to.y ? 1 : -1
        for (let i = 1; i < absY; i ++) {
            const currPos = { x: from.x + dx * i, y: from.y + dy * i} as Position
            if (!this.getCell(currPos).isEmpty()) return false;
        }
        return true;
    }   
    getCell(position: Position) {
        return this.cells[position.x][position.y];
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
    private addBishops(){
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
 