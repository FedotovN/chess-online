import type ChessMove from "@/types/chess/Move";
import Cell from "~/models/chess/Cell";
import type { Position } from "~/types/chess/Position";
import Pawn from "./figures/Pawn";
import Knight from "./figures/Knight"
import Rook from "./figures/Rook"
import King from "./figures/King"
import Queen from "./figures/Queen"
import Bishop from "./figures/Bishop"
import Figure from "./figures/Figure";
import type { Color } from "~/types/chess/Color";
import type { FigureName } from "~/types/chess/FigureName";
import type figures from "./figures";
export default class Board {
    cells: { [key: string]: Array<Cell> } = {};
    moves: ChessMove[] = [];
    constructor() {
        this.addCells();
        this.addFigures();
    }
    moveFigure(from: Position, to: Position) {
        const prev = this.cells[from.x][from.y];
        const target = this.cells[to.x][to.y];
        const noFigure = prev.isEmpty();
        const samePosition = prev.comparePosition(target.position);
        const cantMove = !prev.figure?.canMoveTo(this, target);
        if (noFigure || samePosition || cantMove) return false;
        this.swapFigures(prev, target);
        this.moves.push({ figure: this.cells[to.x][to.y].figure!.name, from, to });
        return true;
    }
    isEmptyVertical(from: Position, to: Position) {
        if (!Cell.isVertical(from, to)) return false;
        const min = Math.min(from.y, to.y);
        const max = Math.max(from.y, to.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.cells[from.x][y].isEmpty())
                return false
        }
        return true
    }
    isEmptyHorizontal(from: Position, to: Position) {
        if (!Cell.isHorizontal(from, to)) return false;
        const min = Math.min(from.x, to.x);
        const max = Math.max(from.x, to.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.cells[x][from.y].isEmpty())
                return false
        }
        return true
    }
    isEmptyDiagonal(from: Position, to: Position) {
        if (!Cell.isDiagonal(from, to)) return false;
        const path = Math.abs(to.y - from.y);
        const dx = from.x < to.x ? 1 : -1
        const dy = from.y < to.y ? 1 : -1
        for (let i = 1; i < path; i++) {
            const currPos = { x: from.x + dx * i, y: from.y + dy * i } as Position
            if (!this.getCell(currPos).isEmpty()) return false;
        }
        return true;
    }
    isAttacked(position: Position, side: Color) {
        const cell = this.getCell(position);
        const enemies = this.getSideFigures(side);
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy instanceof King) {
                if (enemy.canMoveTo(this, cell, false)) {
                    return true
                }
                continue;
            }
            if (enemy.canAttackTo(this, cell)) return true;
        }
        return false;
    }
    isAttackedBy(position: Position, enemySide: Color): Figure | null {
        const cell = this.getCell(position);
        const enemies = this.getSideFigures(enemySide);
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy instanceof King) {
                if (enemy.canMoveTo(this, cell, false)) {
                    return enemy
                }
                continue;
            }
            if (enemy.canAttackTo(this, cell)) return enemy;
        }
        return null;
    }
    isCheckmate(to: Color) {
        const king = this.getKing('white');
        const { position, side } = king;
        const attackingFigure = this.isAttackedBy(position, to === 'white' ? 'black' : 'white');
        if (!attackingFigure) return false;
        // we're certainly being attacked
        const cells = this.getAllCells();
        const friendlyFigures = this.getSideFigures(side);
        // check if king can go somewhere
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (king.canMoveTo(this, cell)) {
                console.log('can go somewhere from ', attackingFigure.name)
                return false;
            }
        }
        const attackingFigureCell = this.getCell(attackingFigure.position);
        // check if we can eat attacking figure
        for (let i = 0; i < friendlyFigures.length; i++) {
            const figure = friendlyFigures[i];
            if (figure.canAttackTo(this, attackingFigureCell)){
                console.log('Can eat attacking', attackingFigure.name)
                return false
            }
        }
        // check if we can defend our king by sacrificing our figure
        const enemyPossibleMoves = cells.filter(cell => attackingFigure.canMoveTo(this, cell));
        const { x: kingX, y: kingY } = position;
        const { x: enemyX, y: enemyY } = attackingFigure.position;
        const cellsBetweenKingAndEnemy = enemyPossibleMoves.filter(cell => {
            const { x: cellX, y: cellY } = cell.position;
            const sameX = kingX === enemyX;
            const sameY = kingY === enemyY;
            const betweenX = kingX > enemyX ? kingX > cellX && cellX > enemyX : kingX < cellX && cellX < enemyX;
            const betweenY = kingY > enemyY ? kingY > cellY && cellY > enemyY : kingY < cellY && cellY < enemyY;
            return sameX ? betweenY : sameY ? betweenX : betweenX && betweenY;
        })
        for (let i = 0; i < friendlyFigures.length; i++) {
            const figure = friendlyFigures[i];
            for (let j = 0; j < cellsBetweenKingAndEnemy.length; j++) {
                const saveCell = cellsBetweenKingAndEnemy[j];
                if (figure.canMoveTo(this, saveCell)) {
                    console.log('can stand between king and', attackingFigure.name, 'with', figure.name, 'on', saveCell.position);
                    return false
                }
            }
        }
        console.log('checkmate')
        return true;
    }
    private getKing(side: Color) {
        return this.getNameFigures('king').find(king => king.side === side) as King;
    }
    private getCell(position: Position) {
        return this.cells[position.x][position.y];
    }
    private getAllFigures() {
        return this.getAllCells()
                .filter(cell => !cell.isEmpty())
                .map(cell => cell.figure) as Figure[];
        
    }
    private getAllCells() {
        return Object.keys(this.cells)
            .map(column => this.cells[column])
            .flat()
    }
    private getSideFigures(side: Color) {
        return this.getAllFigures().filter(figure => figure.side === side);
    }
    private getNameFigures<T extends Figure>(name: FigureName) {
        return this.getAllFigures().filter(figure => figure.name === name) as T[];
    }
    private swapFigures(from: Cell, to: Cell) {
        if (!from.figure) throw new Error(`No figure was found but trying to swap`);
        if (from.comparePosition(to.position)) return;
        let { position: targetPos } = to;
        to.figure = from.figure;
        to.figure.position = targetPos;
        from.figure = null;
        if (to.figure instanceof Pawn) {
            to.figure.isFirstMove = false;
        }
        if (to.figure instanceof King){
            to.figure.isFirstMove = false;
        }
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
