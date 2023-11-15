import type ChessMove from "@/types/chess/Move";
import type Cell from "~/types/chess/Cell";
import type { Position } from "~/types/chess/Position";
import Pawn from "./figures/Pawn";
import Knight from "./figures/Knight"
import Rook from "./figures/Rook"
import King from "./figures/King"
import Queen from "./figures/Queen"
import Bishop from "./figures/Bishop"
export default class Board {
    cells: { [key: string]: Array<Cell> } = {};
    moves: ChessMove[] = [];
    constructor() {
        this.addCells();
        this.addFigures();
    }
    private addCells() {
        for (let x = 0; x < 8; x++) {
            this.cells[x] = [];
            for (let y = 0; y < 8; y++) {
                this.cells[x][y] = {
                    figure: null,
                    position: { x, y } as Position,
                    side: this.getCellColor(x, y),
                }
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
    moveFigure(from: Position, to: Position) {
        const cell = this.cells[from.x][from.y];
        if (from.x === to.x && from.y === to.y) return;
        if (!cell.figure) throw new Error(`No figure was found in coords x: ${from.x} y: ${from.y}`);
        this.cells[to.x][to.y].figure = cell.figure;
        this.cells[to.x][to.y].figure!.position = { x: to.x, y: to.x };
        this.cells[from.x][from.y].figure = null;
        
        this.moves.push({ figure: this.cells[to.x][to.y].figure!.name, from, to });
    }
}
 