import Figure from "~/models/chess/figures/Figure";
import Cell from "~/types/chess/Cell";
import Board from "~/models/chess/Board";
import { plainToClass } from "class-transformer"
import type Move from "~/types/chess/Move";
import figures from "~/models/chess/figures";
import type { FigureName } from "~/types/chess/FigureName";
import ChessRoom from "~/models/chess/room/ChessRoom";
// TODO do something with this nightmare please oh my god

type PlainObjectBoard = { cells: { [key: string]: Array<object> }, moves: Array<object> };
type PlainObjectFigure = { name: FigureName };
type PlainObjectCell = { figure: object | null };

export function getFigureInstance(plainObject: PlainObjectFigure): Figure {
    const FigureConstructor = figures[plainObject.name];
    return plainToClass(FigureConstructor, plainObject);
}
export function getCellInstance(plainObject: PlainObjectCell): Cell {
    plainObject.figure = plainObject.figure
    ? getFigureInstance(plainObject.figure as PlainObjectFigure)
    : null
    return plainToClass(Cell, plainObject);
}
export function getBoardInstance(plainObject: PlainObjectBoard): Board {
    const board = new Board();
    Object.keys(plainObject.cells).forEach(column => {
        board.cells[column] = plainObject.cells[column].map(cell => getCellInstance(cell as PlainObjectCell));
    });
    board.moves = plainObject.moves as Move[];
    return board;
}
export function getRoomInstance(plainObject: { board: object }) {
    const board = getBoardInstance(plainObject.board as PlainObjectBoard);
    plainObject.board = board;
    return plainToClass(ChessRoom, plainObject);
}